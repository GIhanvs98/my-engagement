"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const OUTER = "M0 -62 C 8 -76, 8 -86, 0 -94 C -8 -86, -8 -76, 0 -62Z";
const INNER = "M0 -28 C 12 -40, 12 -54, 0 -64 C -12 -54, -12 -40, 0 -28Z";
const CORE = "M0 -8 C 4 -13, 4 -19, 0 -23 C -4 -19, -4 -13, 0 -8Z";

/** Lotus mandala: draws itself, then the petal rings rotate slowly in opposite directions. */
export default function Mandala({ className, immediate = false }: { className?: string; immediate?: boolean }) {
  const { ref, inView } = useInView<SVGSVGElement>(0.2);
  const drawn = immediate || inView;
  const stroke = { stroke: "#c6a664", strokeWidth: 1, fill: "#e8d6ab", fillOpacity: 0.14 } as const;

  return (
    <svg
      ref={ref}
      viewBox="-100 -100 200 200"
      className={cn(drawn && "is-drawn", className)}
      aria-hidden="true"
      fill="none"
    >
      <circle className="draw" pathLength={1} r="97" stroke="#c6a664" strokeWidth="1" style={{ ["--draw-dur" as string]: "3s" }} />
      <circle className="spin-reverse" r="92" stroke="#c6a664" strokeWidth="0.8" strokeDasharray="1.5 5" opacity="0.8" />

      <g className="spin-slow" style={{ animationDuration: "90s" }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={i}
            className="draw"
            pathLength={1}
            d={OUTER}
            transform={`rotate(${i * 22.5})`}
            style={{ ["--draw-delay" as string]: `${0.2 + i * 0.1}s`, ["--draw-dur" as string]: "1.6s" }}
            {...stroke}
          />
        ))}
      </g>

      <g className="spin-reverse" style={{ animationDuration: "120s" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            className="draw"
            pathLength={1}
            d={INNER}
            transform={`rotate(${i * 45 + 22.5})`}
            style={{ ["--draw-delay" as string]: `${1 + i * 0.12}s`, ["--draw-dur" as string]: "1.6s" }}
            {...stroke}
            fillOpacity={0.22}
          />
        ))}
      </g>

      <circle className="draw" pathLength={1} r="26" stroke="#c6a664" strokeWidth="1" style={{ ["--draw-delay" as string]: "1.6s" }} />

      <g className="spin-slow" style={{ animationDuration: "60s" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={CORE} transform={`rotate(${i * 45})`} {...stroke} fillOpacity={0.35} />
        ))}
      </g>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          className="pop"
          style={{ ["--pop-delay" as string]: `${2 + i * 0.08}s` }}
          cx={Math.cos((i * Math.PI) / 6) * 20}
          cy={Math.sin((i * Math.PI) / 6) * 20}
          r="1.2"
          fill="#c6a664"
          stroke="none"
        />
      ))}
      <circle className="pop heartbeat" style={{ ["--pop-delay" as string]: "2.4s" }} r="3.5" fill="#6b1d2a" stroke="#c6a664" strokeWidth="0.8" />
    </svg>
  );
}
