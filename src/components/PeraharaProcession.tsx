"use client";

import { cn } from "@/lib/utils";

interface PeraharaProcessionProps {
  className?: string;
}

/**
 * Traditional Sri Lankan Royal Perahara (Kandyan Procession) vector illustration
 * matching the authentic visual aesthetic of invitation.lk/samples/nilame-traditional.
 */
export default function PeraharaProcession({ className }: PeraharaProcessionProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-2 items-end select-none opacity-90",
        className
      )}
      aria-hidden="true"
    >
      {/* Left side: Caparisoned Raja Tusker Elephant with casket & drummer */}
      <div className="relative w-full flex items-end justify-start pl-1 sm:pl-4">
        <svg
          viewBox="0 0 320 180"
          fill="none"
          className="w-full max-w-[260px] sm:max-w-[340px] h-auto drop-shadow-[0_8px_16px_rgba(92,20,15,0.15)]"
        >
          <defs>
            <linearGradient id="peraharaGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8d6ab" />
              <stop offset="50%" stopColor="#c6a664" />
              <stop offset="100%" stopColor="#a3813f" />
            </linearGradient>
            <linearGradient id="clothMaroon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a1f1a" />
              <stop offset="100%" stopColor="#4a0f0d" />
            </linearGradient>
          </defs>

          {/* Elephant Body Silhouette */}
          <path
            d="M50 170 L50 120 C50 100 70 80 100 75 C140 70 190 75 220 95 C235 85 250 80 265 90 C275 98 280 115 285 130 C290 145 292 165 292 170 L275 170 C272 155 270 140 265 135 C260 130 255 145 252 170 L235 170 C238 145 240 130 230 125 C215 120 205 135 200 170 L180 170 C182 145 185 130 170 125 C155 120 145 140 142 170 L122 170 C125 145 128 128 115 125 C100 120 92 140 90 170 Z"
            fill="#473c1f"
            opacity="0.88"
          />

          {/* Elephant Trunk & Tusk */}
          <path
            d="M280 115 C295 125 305 140 305 155 C305 165 295 170 290 162 C295 152 290 140 282 130 Z"
            fill="#473c1f"
          />
          {/* White Ceremonial Tusk */}
          <path
            d="M272 130 C285 138 295 142 305 138 C295 134 285 128 275 126 Z"
            fill="#fffdf8"
            stroke="#d2b97a"
            strokeWidth="0.8"
          />

          {/* Ceremonial Embroidered Caparison Blanket (Netthi Malaya) */}
          <path
            d="M105 78 C140 74 190 78 220 96 C215 130 180 145 140 145 C115 145 105 125 105 78 Z"
            fill="url(#clothMaroon)"
            stroke="url(#peraharaGold)"
            strokeWidth="1.5"
          />
          {/* Decorative Gold Trim & Fringe */}
          <path
            d="M110 95 Q160 105 212 108 M115 115 Q160 125 205 126 M120 135 Q160 142 195 140"
            stroke="url(#peraharaGold)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <circle cx="160" cy="115" r="9" fill="url(#peraharaGold)" opacity="0.85" />
          <circle cx="160" cy="115" r="5" fill="url(#clothMaroon)" />

          {/* Sacred Relic Casket (Ran Hilgeya / Howdah) on Elephant Back */}
          <path
            d="M140 76 L145 52 L175 52 L180 76 Z"
            fill="url(#peraharaGold)"
            stroke="#7a1f1a"
            strokeWidth="1"
          />
          <path
            d="M142 52 L160 30 L178 52 Z"
            fill="url(#peraharaGold)"
            stroke="#7a1f1a"
            strokeWidth="1"
          />
          {/* Golden Pinnacle / Spire (Kotaya) */}
          <path
            d="M160 30 L160 18 M157 22 L163 22"
            stroke="url(#peraharaGold)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Traditional Kandyan Drummer (Geta Bera) Silhouette */}
          <path
            d="M20 170 L25 130 C25 115 35 110 40 115 C45 120 40 135 42 170 Z"
            fill="#5c140f"
            opacity="0.9"
          />
          {/* Traditional Drum (Bera) */}
          <ellipse cx="32" cy="138" rx="14" ry="7" fill="url(#peraharaGold)" stroke="#473c1f" strokeWidth="1" />
          <circle cx="32" cy="105" r="6" fill="#5c140f" />
        </svg>
      </div>

      {/* Right side: Caparisoned Elephant facing center with flag bearer */}
      <div className="relative w-full flex items-end justify-end pr-1 sm:pr-4 scale-x-[-1]">
        <svg
          viewBox="0 0 320 180"
          fill="none"
          className="w-full max-w-[260px] sm:max-w-[340px] h-auto drop-shadow-[0_8px_16px_rgba(92,20,15,0.15)]"
        >
          {/* Elephant Body Silhouette */}
          <path
            d="M50 170 L50 120 C50 100 70 80 100 75 C140 70 190 75 220 95 C235 85 250 80 265 90 C275 98 280 115 285 130 C290 145 292 165 292 170 L275 170 C272 155 270 140 265 135 C260 130 255 145 252 170 L235 170 C238 145 240 130 230 125 C215 120 205 135 200 170 L180 170 C182 145 185 130 170 125 C155 120 145 140 142 170 L122 170 C125 145 128 128 115 125 C100 120 92 140 90 170 Z"
            fill="#473c1f"
            opacity="0.88"
          />

          {/* Elephant Trunk & Tusk */}
          <path
            d="M280 115 C295 125 305 140 305 155 C305 165 295 170 290 162 C295 152 290 140 282 130 Z"
            fill="#473c1f"
          />
          <path
            d="M272 130 C285 138 295 142 305 138 C295 134 285 128 275 126 Z"
            fill="#fffdf8"
            stroke="#d2b97a"
            strokeWidth="0.8"
          />

          {/* Embroidered Caparison Blanket */}
          <path
            d="M105 78 C140 74 190 78 220 96 C215 130 180 145 140 145 C115 145 105 125 105 78 Z"
            fill="#7a1f1a"
            stroke="#c6a664"
            strokeWidth="1.5"
          />
          <path
            d="M110 95 Q160 105 212 108 M115 115 Q160 125 205 126 M120 135 Q160 142 195 140"
            stroke="#e8d6ab"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <circle cx="160" cy="115" r="9" fill="#c6a664" opacity="0.85" />
          <circle cx="160" cy="115" r="5" fill="#7a1f1a" />

          {/* Howdah on back */}
          <path
            d="M140 76 L145 52 L175 52 L180 76 Z"
            fill="#c6a664"
            stroke="#7a1f1a"
            strokeWidth="1"
          />
          <path
            d="M142 52 L160 30 L178 52 Z"
            fill="#c6a664"
            stroke="#7a1f1a"
            strokeWidth="1"
          />
          <path
            d="M160 30 L160 18 M157 22 L163 22"
            stroke="#c6a664"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Ceremonial Sesath / Flag Bearer */}
          <path
            d="M15 170 L20 115 C22 105 30 100 35 110 C38 120 35 145 35 170 Z"
            fill="#5c140f"
            opacity="0.9"
          />
          <circle cx="28" cy="95" r="6" fill="#5c140f" />
          {/* Traditional Sesath Sunshield disc */}
          <line x1="22" y1="170" x2="22" y2="70" stroke="#c6a664" strokeWidth="2" />
          <circle cx="22" cy="70" r="14" fill="#c6a664" stroke="#7a1f1a" strokeWidth="1.5" />
          <circle cx="22" cy="70" r="7" fill="#fffdf8" />
        </svg>
      </div>
    </div>
  );
}
