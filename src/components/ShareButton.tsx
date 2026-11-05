"use client";

import { couple, wedding } from "@/data/wedding";

export default function ShareButton() {
  const text = `You're invited! ${couple.groomFirstName} & ${couple.brideFirstName} are celebrating their engagement on ${wedding.displayDate}. ❤️ ${wedding.siteUrl}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${couple.groomFirstName} & ${couple.brideFirstName}'s Engagement`,
          text,
          url: wedding.siteUrl,
        });
        return;
      } catch {
        /* user cancelled or share failed; fall through to WhatsApp link */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium text-white shadow-[0_10px_25px_-10px_rgba(37,211,102,0.7)] hover:brightness-95 transition"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.4 1.32-1.93 1.36-.49.05-1.02.24-3.4-.71-2.86-1.14-4.7-4.03-4.84-4.22-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.24-.26.53-.32.71-.32.18 0 .36 0 .51.01.16.01.38-.06.6.46.24.57.79 1.97.86 2.11.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.14.48.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
      Share Invitation
    </button>
  );
}
