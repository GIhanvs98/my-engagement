import { useId } from "react";

/** Repeating gold scalloped "torana" fringe, used as a Kandyan-style border strip. */
export default function PetalBorder({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const id = "pb" + useId().replace(/:/g, "");
  return (
    <svg
      className={`w-full h-4 ${className}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="24" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 16 Q 6 3 12 0 Q 18 3 24 16" fill="#e8d6ab" fillOpacity="0.35" stroke="#c6a664" strokeWidth="1" />
          <circle cx="12" cy="9" r="1.4" fill="#6b1d2a" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
