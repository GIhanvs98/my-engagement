import { Resend } from "resend";
import type { RSVPRecord } from "@/app/api/rsvp/route";
import { couple } from "@/data/wedding";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function sendRsvpNotificationEmail(record: RSVPRecord) {
  if (!resend) {
    console.warn(
      "[Resend] RESEND_API_KEY is not configured in environment variables. Email notification skipped."
    );
    return { success: false, reason: "missing_api_key" };
  }

  const toEmail = process.env.RSVP_NOTIFICATION_EMAIL || "darkcreationsl98@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Engagement RSVP <onboarding@resend.dev>";

  const isAttending = record.attending === "accept";
  const subject = isAttending
    ? `🎉 New RSVP: ${record.fullName} Joyfully Accepted!`
    : `🕊️ RSVP Update: ${record.fullName} Regretfully Declined`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FDFCFA; margin: 0; padding: 24px; color: #2C2A29; }
    .card { max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #E8DFD5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #6B1D2A; color: #FFFDF9; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 0.05em; }
    .header p { margin: 8px 0 0 0; font-size: 13px; color: #E8DFD5; letter-spacing: 0.15em; text-transform: uppercase; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .badge-accept { background: #EBF8EE; color: #1E6B33; border: 1px solid #C4ECD0; }
    .badge-decline { background: #FDF2F2; color: #9B1C1C; border: 1px solid #F8D7DA; }
    .message-box { margin-top: 12px; padding: 16px; background: #FDFCFA; border-left: 3px solid #C5A880; border-radius: 4px; font-style: italic; color: #4A4643; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #A0988E; background: #FAFAF7; border-top: 1px solid #E8DFD5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <p>Engagement Celebration</p>
      <h1>New RSVP Received</h1>
    </div>
    <div class="content">
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="badge ${isAttending ? "badge-accept" : "badge-decline"}">
          ${isAttending ? "✓ Joyfully Accepted" : "✗ Regretfully Declined"}
        </span>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #F3EDE7;">
          <td style="padding: 12px 0; color: #766E65;">Guest Name</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2C2A29;">${record.fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #F3EDE7;">
          <td style="padding: 12px 0; color: #766E65;">Phone Number</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2C2A29;">${record.phone || "Not provided"}</td>
        </tr>
        ${
          isAttending && record.mealPreference
            ? `
        <tr style="border-bottom: 1px solid #F3EDE7;">
          <td style="padding: 12px 0; color: #766E65;">Meal Preference</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2C2A29;">${record.mealPreference}</td>
        </tr>
        `
            : ""
        }
        <tr style="border-bottom: 1px solid #F3EDE7;">
          <td style="padding: 12px 0; color: #766E65;">Submitted At</td>
          <td style="padding: 12px 0; text-align: right; color: #766E65;">${new Date(record.submittedAt).toLocaleString()}</td>
        </tr>
      </table>

      ${
        record.message
          ? `
      <div style="margin-top: 24px;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #766E65; margin: 0 0 8px 0;">Message from Guest</p>
        <div class="message-box">
          &ldquo;${record.message.replace(/\n/g, "<br/>")}&rdquo;
        </div>
      </div>
      `
          : ""
      }
    </div>
    <div class="footer">
      ${couple.groomFirstName} &amp; ${couple.brideFirstName} &mdash; Engagement Invitation
    </div>
  </div>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
    });

    if (error) {
      console.error("[Resend] Error sending RSVP notification email:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Resend] Exception while sending email:", err);
    return { success: false, error: err };
  }
}
