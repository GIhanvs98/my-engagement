/** Two drifting vector waves that melt one section into the next. `fill` = next section's color. */
export default function WaveDivider({ fill = "#f1e7d3", className = "" }: { fill?: string; className?: string }) {
  const d =
    "M0 40 C 200 0, 400 0, 600 40 S 1000 80, 1200 40 S 1600 0, 1800 40 S 2200 80, 2400 40 V80 H0Z";
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 sm:h-20 overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 2400 80" preserveAspectRatio="none" className="wave-b absolute bottom-0 h-full w-[200%] opacity-50">
        <path d={d} fill={fill} />
      </svg>
      <svg viewBox="0 0 2400 80" preserveAspectRatio="none" className="wave-a absolute bottom-0 h-[80%] w-[200%]">
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
