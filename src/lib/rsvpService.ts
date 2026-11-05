export interface RSVPPayload {
  fullName: string;
  email?: string;
  phone?: string;
  attending: "accept" | "decline";
  guests: number;
  mealPreference?: string;
  message?: string;
}

export interface RSVPResponse {
  success?: boolean;
  message?: string;
  error?: string;
  duplicate?: boolean;
}

export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResponse> {
  try {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || `Server responded with status ${response.status}`,
      };
    }

    return {
      success: true,
      message: data.message,
      duplicate: data.duplicate,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return {
      error: `Could not connect to the RSVP server (${message}). Please try again later.`,
    };
  }
}
