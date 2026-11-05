import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface RSVPRecord {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  attending: "accept" | "decline";
  guests: number;
  mealPreference?: string;
  message?: string;
  submittedAt: string;
  ip?: string;
}

// In-memory store for reliability in serverless/read-only environments
const inMemoryStore: RSVPRecord[] = [];

// Try to persist to disk if filesystem is writable
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch {
    // If running in a read-only environment, in-memory store will be used
  }
}

function loadPersistedRSVPs(): RSVPRecord[] {
  try {
    ensureDirectoryExists();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch {
    // fallback to in-memory
  }
  return inMemoryStore;
}

function saveRSVP(record: RSVPRecord) {
  inMemoryStore.push(record);
  try {
    ensureDirectoryExists();
    const existing = loadPersistedRSVPs();
    existing.push(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), "utf8");
  } catch {
    // persisted in memory
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      attending,
      guests,
      mealPreference,
      message,
    } = body;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (attending !== "accept" && attending !== "decline") {
      return NextResponse.json(
        { error: "Please indicate whether you will be attending." },
        { status: 400 }
      );
    }

    let guestCount = 1;
    if (attending === "accept") {
      guestCount = Number(guests);
      if (isNaN(guestCount) || guestCount < 1 || guestCount > 8) {
        return NextResponse.json(
          { error: "Guest count must be between 1 and 8." },
          { status: 400 }
        );
      }
    } else {
      guestCount = 0;
    }

    // Check duplicate submission within memory
    const trimmedName = fullName.trim().toLowerCase();
    const isDuplicate = inMemoryStore.some(
      (r) =>
        r.fullName.trim().toLowerCase() === trimmedName &&
        Date.now() - new Date(r.submittedAt).getTime() < 1000 * 60 * 10
    );

    if (isDuplicate) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! We already received your response.",
          duplicate: true,
        },
        { status: 200 }
      );
    }

    const newRecord: RSVPRecord = {
      id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: email ? String(email).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
      attending,
      guests: guestCount,
      mealPreference: mealPreference ? String(mealPreference).trim() : undefined,
      message: message ? String(message).trim() : undefined,
      submittedAt: new Date().toISOString(),
    };

    saveRSVP(newRecord);

    return NextResponse.json(
      {
        success: true,
        message:
          attending === "accept"
            ? "Thank you for joyfully accepting! We cannot wait to celebrate with you."
            : "Thank you for letting us know. You will be missed in our celebration.",
        rsvp: newRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing RSVP:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const records = loadPersistedRSVPs();
  return NextResponse.json({
    total: records.length,
    attendingCount: records.filter((r) => r.attending === "accept").length,
    guestSum: records
      .filter((r) => r.attending === "accept")
      .reduce((acc, curr) => acc + (curr.guests || 1), 0),
  });
}
