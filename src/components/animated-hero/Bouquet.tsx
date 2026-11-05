"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BouquetProps {
  isThrowing: boolean;
  onApex?: () => void;
  className?: string;
}

export default function Bouquet({ isThrowing, onApex, className }: BouquetProps) {
  const [stage, setStage] = useState<"hand" | "rising" | "apex" | "descending" | "hidden">("hand");

  useEffect(() => {
    if (!isThrowing) return;

    // Launch bouquet
    const riseTimer = setTimeout(() => {
      setStage("rising");
    }, 10);

    // Apex reached around 950ms
    const apexTimer = setTimeout(() => {
      setStage("apex");
      onApex?.();
    }, 950);

    // Descending / dissolve
    const descTimer = setTimeout(() => {
      setStage("descending");
    }, 1400);

    // Fade out after explosion
    const hideTimer = setTimeout(() => {
      setStage("hidden");
    }, 2000);

    return () => {
      clearTimeout(riseTimer);
      clearTimeout(apexTimer);
      clearTimeout(descTimer);
      clearTimeout(hideTimer);
    };
  }, [isThrowing, onApex]);

  if (stage === "hidden") return null;

  return (
    <div
      className={cn(
        "pointer-events-none transition-all duration-700 ease-out z-40 select-none",
        stage === "hand" && "opacity-100 transform translate-x-0 translate-y-0 rotate-0 scale-100",
        stage === "rising" &&
          "opacity-100 animate-[bouquet-throw_1s_cubic-bezier(0.25,1,0.5,1)_forwards]",
        stage === "apex" && "opacity-100 scale-110",
        stage === "descending" && "opacity-0 transform translate-y-16 scale-75 transition-opacity duration-500",
        className
      )}
    >
      {/* Sparkle burst at apex */}
      {stage === "apex" && (
        <div className="absolute inset-0 -m-8 flex items-center justify-center animate-ping pointer-events-none">
          <div className="h-16 w-16 rounded-full bg-champagne-light/70 blur-md" />
        </div>
      )}

      {/* Cascading White & Blush Rose Bridal Bouquet SVG */}
      <svg
        width="64"
        height="76"
        viewBox="0 0 80 95"
        fill="none"
        className="drop-shadow-[0_8px_16px_rgba(48,32,24,0.4)]"
      >
        <defs>
          <radialGradient id="roseWhite" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fdf7ed" />
            <stop offset="100%" stopColor="#e8d8c5" />
          </radialGradient>
          <radialGradient id="roseBlush" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff6f4" />
            <stop offset="65%" stopColor="#f7d9d2" />
            <stop offset="100%" stopColor="#e2b8ae" />
          </radialGradient>
          <linearGradient id="leafGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5a7a4f" />
            <stop offset="100%" stopColor="#2c4224" />
          </linearGradient>
          <linearGradient id="ribbonGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e8cf" />
            <stop offset="100%" stopColor="#b49a62" />
          </linearGradient>
        </defs>

        {/* Green foliage base */}
        <path d="M40 35 Q20 20 12 35 Q25 45 40 38 Z" fill="url(#leafGreen)" />
        <path d="M40 35 Q60 18 68 32 Q55 45 40 38 Z" fill="url(#leafGreen)" />
        <path d="M40 40 Q40 60 30 70 Q35 55 40 42 Z" fill="url(#leafGreen)" />
        <path d="M40 40 Q45 60 52 68 Q46 55 40 42 Z" fill="url(#leafGreen)" />

        {/* Roses Cluster */}
        {/* Top Center Rose */}
        <circle cx="40" cy="24" r="13" fill="url(#roseWhite)" stroke="#e4d4c0" strokeWidth="0.8" />
        <circle cx="40" cy="24" r="8" fill="url(#roseBlush)" />
        <circle cx="40" cy="24" r="3.5" fill="#e8c2b7" />

        {/* Left Rose */}
        <circle cx="28" cy="34" r="11" fill="url(#roseWhite)" stroke="#e4d4c0" strokeWidth="0.8" />
        <circle cx="28" cy="34" r="6.5" fill="url(#roseBlush)" />

        {/* Right Rose */}
        <circle cx="52" cy="34" r="11" fill="url(#roseWhite)" stroke="#e4d4c0" strokeWidth="0.8" />
        <circle cx="52" cy="34" r="6.5" fill="url(#roseBlush)" />

        {/* Center Main Rose */}
        <circle cx="40" cy="38" r="14" fill="url(#roseWhite)" stroke="#e0cfba" strokeWidth="1" />
        <circle cx="40" cy="38" r="8.5" fill="url(#roseBlush)" />
        <circle cx="40" cy="38" r="4" fill="#deb4a8" />

        {/* Bottom Cascading Rose */}
        <circle cx="40" cy="52" r="9" fill="url(#roseWhite)" stroke="#e4d4c0" strokeWidth="0.8" />
        <circle cx="40" cy="52" r="5" fill="url(#roseBlush)" />

        {/* Trailing Ivory Ribbons */}
        <path
          d="M38 58 Q32 75 36 90 Q39 80 40 62 Z"
          fill="url(#ribbonGold)"
          opacity="0.85"
        />
        <path
          d="M42 58 Q48 74 44 92 Q42 80 40 62 Z"
          fill="url(#ribbonGold)"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
