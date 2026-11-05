import { cn } from "@/lib/utils";

/** Delicate vector butterfly with flapping wings; wrap in .flutter-a/.flutter-b to drift. */
export default function Butterfly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" className={cn("overflow-visible", className)} aria-hidden="true">
      <g className="wing-l">
        <path d="M30 24 C 18 4, 2 4, 4 20 C 5 32, 20 34, 30 26Z" fill="#e8d6ab" fillOpacity="0.75" stroke="#c6a664" strokeWidth="1" />
        <path d="M30 27 C 20 30, 10 34, 14 42 C 20 46, 28 36, 30 28Z" fill="#fffdf8" fillOpacity="0.9" stroke="#c6a664" strokeWidth="1" />
        <circle cx="13" cy="17" r="2.2" fill="#c6a664" fillOpacity="0.7" />
      </g>
      <g className="wing-r">
        <path d="M30 24 C 42 4, 58 4, 56 20 C 55 32, 40 34, 30 26Z" fill="#e8d6ab" fillOpacity="0.75" stroke="#c6a664" strokeWidth="1" />
        <path d="M30 27 C 40 30, 50 34, 46 42 C 40 46, 32 36, 30 28Z" fill="#fffdf8" fillOpacity="0.9" stroke="#c6a664" strokeWidth="1" />
        <circle cx="47" cy="17" r="2.2" fill="#c6a664" fillOpacity="0.7" />
      </g>
      <ellipse cx="30" cy="26" rx="1.6" ry="8" fill="#a3813f" />
      <path d="M30 18 C 28 12, 25 9, 23 8 M30 18 C 32 12, 35 9, 37 8" stroke="#a3813f" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}
