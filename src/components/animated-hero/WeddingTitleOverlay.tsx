"use client";

import { couple, wedding } from "@/data/wedding";
import Ornament from "../Ornament";
import Mandala from "../Mandala";
import { cn } from "@/lib/utils";

interface WeddingTitleOverlayProps {
  isVisible: boolean;
  onOpen: () => void;
  onSkip?: () => void;
  className?: string;
}

export default function WeddingTitleOverlay({
  isVisible,
  onOpen,
  onSkip,
  className,
}: WeddingTitleOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-between p-6 sm:p-10 text-center transition-all duration-1000 select-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {/* Top Header / Skip Button */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-champagne-light drop-shadow">
          Sri Suba Mangalam
        </span>

        {onSkip && (
          <button
            onClick={onSkip}
            className="rounded-full bg-black/40 backdrop-blur-md px-4 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-white/90 hover:bg-black/60 transition-colors border border-white/20 cursor-pointer"
          >
            Skip Intro
          </button>
        )}
      </div>

      {/* Main Wedding Title Card */}
      <div className="relative my-auto flex flex-col items-center pointer-events-auto max-w-lg">
        {/* Subtle decorative spinning mandala background */}
        <Mandala
          immediate
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] opacity-25"
        />

        <div className="relative z-10 backdrop-blur-sm bg-black/25 p-7 sm:p-9 rounded-3xl border border-champagne/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <p className="font-body text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-champagne-light drop-shadow">
            The Engagement Of
          </p>

          <div className="mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent via-champagne to-transparent" />

          <h1 className="font-display italic text-4xl sm:text-6xl text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            {couple.groomFirstName}{" "}
            <span className="font-script not-italic text-champagne-light mx-1">&amp;</span>{" "}
            {couple.brideFirstName}
          </h1>

          <p className="font-display text-sm sm:text-base text-white/90 mt-2.5 tracking-wider drop-shadow">
            {wedding.dayOfWeek}, {wedding.displayDate}
          </p>

          <Ornament className="my-4 text-champagne-light opacity-80" />

          <p className="font-body text-xs text-white/80 max-w-xs mx-auto leading-relaxed drop-shadow">
            Two lives, two hearts, joined together in friendship, united forever in love.
          </p>

          {/* OPEN INVITATION BUTTON */}
          <div className="mt-7">
            <button
              onClick={onOpen}
              className="group relative inline-flex items-center gap-3 rounded-full border border-champagne bg-gradient-to-r from-maroon via-maroon to-maroon-deep px-8 py-3.5 font-body text-xs tracking-[0.3em] uppercase font-medium text-ivory transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(180,154,98,0.5)] shadow-[0_8px_25px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              <span className="ring-pulse absolute inset-0 rounded-full bg-champagne/40" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-champagne-light transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              Open Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle / Venue Note */}
      <div className="w-full text-center pointer-events-auto">
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-white/70 drop-shadow">
          Rockhill Reception Hall • Homagama, Sri Lanka
        </p>
      </div>
    </div>
  );
}
