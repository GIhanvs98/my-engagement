"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const LEAVES: Array<[number, number, number]> = [
  [29, 161, -100], [29, 161, -10],
  [52, 127, -105], [52, 127, -5],
  [77, 96, -100], [77, 96, 0],
  [140, 50, -85], [140, 50, 10],
  [170, 28, -80], [170, 28, 15],
];

function Leaf({ x, y, a, i }: { x: number; y: number; a: number; i: number }) {
  return (
    <path
      className="pop"
      style={{ ["--pop-delay" as string]: `${1.0 + i * 0.12}s` }}
      d="M0 0 C 5 -9, 19 -9, 26 0 C 19 9, 5 9, 0 0Z"
      transform={`translate(${x} ${y}) rotate(${a})`}
      fill="#e8d6ab"
      fillOpacity="0.55"
      stroke="#c6a664"
      strokeWidth="1"
    />
  );
}

function MiniBlossom({ x, y, s, i }: { x: number; y: number; s: number; i: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="pop" style={{ ["--pop-delay" as string]: `${1.8 + i * 0.25}s` }}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-8" rx="5" ry="8" transform={`rotate(${r})`} fill="#fffdf8" stroke="#c6a664" strokeWidth="1" />
        ))}
        <circle r="3" fill="#e8d6ab" stroke="#c6a664" strokeWidth="0.8" />
      </g>
    </g>
  );
}

/**
 * Hand-drawn style botanical branch that draws itself, then leaves & blossoms
 * pop in, then the whole branch sways gently. Anchored to a corner.
 */
export default function FloralCorner({
  className,
  rotate = 0,
  immediate = false,
}: {
  className?: string;
  /** 0 = top-left, 90 = top-right, 180 = bottom-right, 270 = bottom-left */
  rotate?: 0 | 90 | 180 | 270;
  /** draw on mount instead of on scroll (hero) */
  immediate?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const drawn = immediate || inView;

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute", drawn && "is-drawn", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="sway w-full h-full overflow-visible" fill="none">
        {/* main stem is drawn from bottom-left up to the corner */}
        <path
          className="draw"
          pathLength={1}
          d="M4 196 C 40 150, 60 100, 110 70 S 170 30, 196 8"
          stroke="#c6a664"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* thin tendril */}
        <path
          className="draw"
          pathLength={1}
          style={{ ["--draw-delay" as string]: "0.8s", ["--draw-dur" as string]: "2s" }}
          d="M110 70 C 120 100, 100 120, 120 140"
          stroke="#c6a664"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        {LEAVES.map(([x, y, a], i) => (
          <Leaf key={i} x={x} y={y} a={a} i={i} />
        ))}
        <MiniBlossom x={110} y={70} s={1.1} i={0} />
        <MiniBlossom x={52} y={127} s={0.7} i={1} />
        <MiniBlossom x={170} y={28} s={0.8} i={2} />
        <circle className="pop" style={{ ["--pop-delay" as string]: "2.6s" }} cx="120" cy="140" r="3" fill="#c6a664" />
      </svg>
    </div>
  );
}
