"use client";

import { couple } from "@/data/wedding";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const LEFT = [
  "M40 110 C 34 92, 34 70, 46 52",
  "M40 96 C 30 92, 24 84, 22 74",
  "M40 96 C 32 100, 22 100, 14 96",
  "M38 118 C 28 118, 18 122, 12 130",
  "M38 118 C 30 112, 26 104, 26 96",
  "M46 78 C 38 76, 32 70, 30 62",
  "M46 78 C 40 82, 32 84, 24 82",
];
const RIGHT = [
  "M180 110 C 186 92, 186 70, 174 52",
  "M180 96 C 190 92, 196 84, 198 74",
  "M180 96 C 188 100, 198 100, 206 96",
  "M182 118 C 192 118, 202 122, 208 130",
  "M182 118 C 190 112, 194 104, 194 96",
  "M174 78 C 182 76, 188 70, 190 62",
  "M174 78 C 180 82, 188 84, 196 82",
];

/**
 * Signature mark: botanical wreath that draws itself around the initials,
 * with a slowly rotating dashed halo and a heartbeat at the base.
 */
export default function Monogram({ className, immediate = false }: { className?: string; immediate?: boolean }) {
  const { ref, inView } = useInView<SVGSVGElement>(0.3);
  const drawn = immediate || inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 220"
      className={cn("text-champagne", drawn && "is-drawn", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle className="spin-reverse" cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 7" opacity="0.6" />
      <circle className="draw" pathLength={1} cx="110" cy="110" r="86" stroke="currentColor" strokeWidth="1" opacity="0.7" />

      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {LEFT.map((d, i) => (
          <path key={`l${i}`} className="draw" pathLength={1} d={d} style={{ ["--draw-delay" as string]: `${0.3 + i * 0.18}s`, ["--draw-dur" as string]: "1.6s" }} />
        ))}
        {RIGHT.map((d, i) => (
          <path key={`r${i}`} className="draw" pathLength={1} d={d} style={{ ["--draw-delay" as string]: `${0.3 + i * 0.18}s`, ["--draw-dur" as string]: "1.6s" }} />
        ))}
      </g>

      <text
        className="fade-late"
        x="110"
        y="128"
        textAnchor="middle"
        fontSize="62"
        fill="currentColor"
        style={{ fontFamily: "var(--font-script)" }}
      >
        {couple.initials.groom}&amp;{couple.initials.bride}
      </text>

      <path
        className="heartbeat"
        d="M110 172 C 103 166, 101 162, 103.5 159 C 106 157, 109 158, 110 161 C 111 158, 114 157, 116.5 159 C 119 162, 117 166, 110 172Z"
        fill="currentColor"
      />
    </svg>
  );
}
