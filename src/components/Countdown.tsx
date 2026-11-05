"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import Ornament from "./Ornament";
import ScrollReveal from "./ScrollReveal";
import FloralCorner from "./FloralCorner";

function getTimeLeft() {
  const diff = new Date(wedding.date).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

const UNITS: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string; max: number }> = [
  { key: "days", label: "Days", max: 365 },
  { key: "hours", label: "Hours", max: 24 },
  { key: "minutes", label: "Minutes", max: 60 },
  { key: "seconds", label: "Seconds", max: 60 },
];

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft());
    const id = setInterval(tick, 1000);
    const raf = requestAnimationFrame(tick);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  const arrived = time !== null && time.total <= 0;

  return (
    <section className="relative bg-cream py-24 sm:py-32 px-6 overflow-hidden">
      <FloralCorner rotate={90} className="top-0 right-0 w-36 h-36 sm:w-60 sm:h-60 opacity-80" />
      <FloralCorner rotate={270} className="bottom-0 left-0 w-36 h-36 sm:w-60 sm:h-60 opacity-80" />

      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">
            The Big Day Awaits
          </p>
          <Ornament className="my-5" />
        </ScrollReveal>

        {arrived ? (
          <ScrollReveal delay={1}>
            <p className="font-display italic text-3xl sm:text-5xl text-maroon">Today is the day! ❤️</p>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-5 mt-8 max-w-xl mx-auto">
            {UNITS.map((unit, i) => {
              const value = time ? time[unit.key] : 0;
              const progress = time ? Math.min(value / unit.max, 1) : 0;
              return (
                <ScrollReveal key={unit.key} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="card-3d rounded-xl border border-champagne/60 bg-white/75 py-4 sm:py-6 shadow-[0_12px_32px_-18px_rgba(100,44,44,0.35)] backdrop-blur-xs">
                    <span className="block font-display text-3xl sm:text-5xl text-maroon tabular-nums leading-none">
                      {time ? String(value).padStart(2, "0") : "--"}
                    </span>
                    <span className="mx-auto mt-3 block h-px w-8 sm:w-12 bg-champagne/30">
                      <span
                        className="block h-px bg-champagne-dark origin-left"
                        style={{ transform: `scaleX(${progress})`, transition: "transform 1s linear" }}
                      />
                    </span>
                    <span className="mt-2.5 block font-body text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-champagne-dark">
                      {unit.label}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
