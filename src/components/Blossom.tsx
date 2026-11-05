import { cn } from "@/lib/utils";

/** Five-petal blossom vector. Petals use currentColor-friendly palette. */
export default function Blossom({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg viewBox="-20 -20 40 40" className={cn(spin && "spin-slow", className)} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-9"
          rx="5.5"
          ry="9"
          transform={`rotate(${a})`}
          fill="#fbf6ee"
          stroke="#c6a664"
          strokeWidth="0.9"
        />
      ))}
      <circle r="3.4" fill="#e8d6ab" stroke="#c6a664" strokeWidth="0.8" />
      <circle r="1.1" fill="#a3813f" />
    </svg>
  );
}
