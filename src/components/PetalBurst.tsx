function seeded(n: number) {
  const x = Math.sin(n * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Large soft white petals that sweep up the screen, for the cinematic intro. */
export default function PetalBurst({ count = 34 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 26 + seeded(i + 1) * 46;
        return (
          <svg
            key={i}
            viewBox="0 0 40 52"
            width={size}
            height={size * 1.3}
            className="petal-burst"
            style={
              {
                left: `${seeded(i + 2) * 100}%`,
                ["--pd" as string]: `${6 + seeded(i + 3) * 6}s`,
                ["--pdelay" as string]: `${seeded(i + 4) * 6}s`,
                ["--bx" as string]: `${(seeded(i + 5) - 0.5) * 220}px`,
                ["--br" as string]: `${120 + seeded(i + 6) * 420}deg`,
                ["--bs" as string]: `${0.8 + seeded(i + 7) * 0.8}`,
              } as React.CSSProperties
            }
          >
            <path d="M20 2 C 34 10, 40 28, 28 44 C 24 50, 16 50, 12 44 C 0 28, 6 10, 20 2Z" fill="#ffffff" fillOpacity="0.93" stroke="#ece6d8" strokeWidth="1" />
            <path d="M20 6 C 20 20, 20 34, 20 46" stroke="#ddd5c4" strokeWidth="0.8" fill="none" />
          </svg>
        );
      })}
    </div>
  );
}
