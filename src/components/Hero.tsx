"use client";

import Image from "next/image";
import { couple, wedding, heroImage, family } from "@/data/wedding";
import Petals from "./Petals";
import Mandala from "./Mandala";
import PetalBorder from "./PetalBorder";
import FloralCorner from "./FloralCorner";
import Butterfly from "./Butterfly";
import WaveDivider from "./WaveDivider";

export default function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#fffdf8,#f4ead6_75%)]">
      <div className="absolute top-0 inset-x-0 z-10"><PetalBorder /></div>
      <div className="pointer-events-none absolute inset-3 sm:inset-5 z-10 rounded-[28px] border border-champagne/50" />
      <div className="pointer-events-none absolute inset-[18px] sm:inset-[26px] z-10 rounded-[22px] border border-champagne/25" />

      <FloralCorner immediate rotate={0} className="top-4 left-0 w-32 h-32 sm:w-64 sm:h-64 opacity-80" />
      <FloralCorner immediate rotate={90} className="top-4 right-0 w-32 h-32 sm:w-64 sm:h-64 opacity-80" />

      {/* giant slowly turning mandala behind the names */}
      <Mandala immediate className="pointer-events-none absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 w-[150vw] max-w-[820px] opacity-40" />

      <Petals count={12} />
      <div className="pointer-events-none absolute left-[6%] top-[30%]">
        <div className="flutter-a"><Butterfly className="w-8 sm:w-11" /></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 sm:pt-32 pb-28">
        <p className="font-display text-sm sm:text-base tracking-[0.35em] uppercase text-champagne-dark">Sri Suba Mangalam!</p>
        <p className="font-body text-xs sm:text-sm text-ink-soft mt-3 tracking-wide">You are invited to the engagement of</p>

        <h1 className="font-display text-maroon leading-[0.95] mt-5">
          <span className="block text-[3.8rem] sm:text-8xl">{couple.groomFirstName}</span>
          <span className="block font-script text-5xl sm:text-6xl gold-shimmer my-1">&amp;</span>
          <span className="block text-[3.8rem] sm:text-8xl">{couple.brideFirstName}</span>
        </h1>

        <div className="mt-7 grid grid-cols-2 gap-6 sm:gap-14 font-body text-xs text-ink-soft">
          <p><span className="block text-[10px] tracking-[0.25em] uppercase text-champagne-dark mb-1">Daughter of</span>{family.bride.short}</p>
          <p><span className="block text-[10px] tracking-[0.25em] uppercase text-champagne-dark mb-1">Son of</span>{family.groom.short}</p>
        </div>

        {/* date block */}
        <div className="mt-9 flex items-center gap-5 sm:gap-8">
          <span className="h-px w-10 sm:w-20 bg-champagne" />
          <div className="text-maroon">
            <p className="font-body text-xs tracking-[0.45em] uppercase text-champagne-dark">November</p>
            <p className="font-display text-7xl sm:text-8xl leading-none my-1">20</p>
            <p className="font-body text-xs tracking-[0.45em] uppercase text-champagne-dark">2026</p>
          </div>
          <span className="h-px w-10 sm:w-20 bg-champagne" />
        </div>
        <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-soft mt-4">{wedding.dayOfWeek}, {wedding.displayDate}</p>

        {/* arched couple portrait */}
        <div className="relative mt-12 w-60 sm:w-72">
          <svg viewBox="0 0 40 24" className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 heartbeat" aria-hidden="true">
            <path d="M20 22 C 16 14, 12 10, 14 5 C 16 1, 19 2, 20 6 C 21 2, 24 1, 26 5 C 28 10, 24 14, 20 22Z" fill="#6b1d2a" stroke="#c6a664" strokeWidth="1" />
          </svg>
          <div className="rounded-t-full border border-champagne p-2 bg-white/60 shadow-[0_25px_60px_-25px_rgba(107,29,42,0.45)]">
            <div className="relative aspect-[3/4] rounded-t-full overflow-hidden ring-1 ring-champagne/60">
              <Image src={heroImage} alt={`${couple.groomFirstName} and ${couple.brideFirstName}`} fill priority sizes="300px" className="object-cover" />
            </div>
          </div>
        </div>

        <p className="mt-9 max-w-md font-body text-sm sm:text-base text-ink-soft leading-relaxed">{wedding.welcomeMessage}</p>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("wedding:replay"))}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne/60 bg-cream/90 px-5 py-2 font-body text-[11px] tracking-[0.2em] uppercase text-maroon hover:bg-maroon hover:text-ivory transition-all shadow-sm cursor-pointer hover:scale-105"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Replay Cinematic Intro
        </button>
      </div>

      <WaveDivider fill="#f1e7d3" />

      <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-maroon/70">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
        <span className="relative h-8 rounded-full border border-maroon/40 flex justify-center pt-1.5" style={{ width: 18 }}>
          <span className="h-1.5 w-1.5 rounded-full bg-champagne-dark scroll-dot" />
        </span>
      </div>
    </section>
  );
}
