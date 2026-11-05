"use client";

import { useMemo } from "react";

// Simple seeded pseudo-random so server and client render identically.
function seeded(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function Petal({ seed }: { seed: number }) {
  const left = seeded(seed) * 100;
  const size = 8 + seeded(seed + 1) * 10;
  const duration = 12 + seeded(seed + 2) * 10;
  const delay = seeded(seed + 3) * 14;
  const drift = 30 + seeded(seed + 4) * 90;
  const opacity = 0.4 + seeded(seed + 5) * 0.4;
  const hue = seeded(seed + 6) > 0.5 ? "#e8d6ab" : "#c6a664";

  return (
    <span
      className="petal"
      style={
        {
          left: `${left}%`,
          width: size,
          height: size * 0.8,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity,
          "--drift": `${drift}px`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 16" width="100%" height="100%">
        <path
          d="M10 0 C 15 2, 20 6, 15 12 C 12 15, 6 15, 4 12 C -1 6, 5 2, 10 0 Z"
          fill={hue}
        />
      </svg>
    </span>
  );
}

export default function Petals({ count = 14 }: { count?: number }) {
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => i * 17.3 + 3), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {seeds.map((s, i) => (
        <Petal key={i} seed={s} />
      ))}
    </div>
  );
}
