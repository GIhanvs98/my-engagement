function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Small vector hearts that drift upward and fade. Deterministic for SSR. */
export default function FloatingHearts({ count = 8 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 10 + seeded(i + 1) * 12;
        return (
          <svg
            key={i}
            viewBox="0 0 24 22"
            className="heart-rise"
            width={size}
            height={size}
            style={
              {
                left: `${5 + seeded(i + 7) * 90}%`,
                ["--hd" as string]: `${10 + seeded(i + 3) * 8}s`,
                ["--hdelay" as string]: `${seeded(i + 5) * 10}s`,
                ["--hx" as string]: `${(seeded(i + 9) - 0.5) * 80}px`,
              } as React.CSSProperties
            }
          >
            <path
              d="M12 21 C 3 14, 1 9, 4 5 C 7 2, 11 3, 12 7 C 13 3, 17 2, 20 5 C 23 9, 21 14, 12 21Z"
              fill="#e8d6ab"
              stroke="#c6a664"
              strokeWidth="1"
            />
          </svg>
        );
      })}
    </div>
  );
}
