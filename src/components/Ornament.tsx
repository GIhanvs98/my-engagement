"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import Blossom from "./Blossom";

/** Section divider: lines grow outward, a blossom spins at the centre, hearts beat beside it. */
export default function Ornament({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-3 select-none", inView && "is-drawn", className)}
      aria-hidden="true"
    >
      <span className="grow-x origin-r h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-champagne" />
      <svg width="9" height="8" viewBox="0 0 24 22" className="heartbeat shrink-0">
        <path d="M12 21 C 3 14, 1 9, 4 5 C 7 2, 11 3, 12 7 C 13 3, 17 2, 20 5 C 23 9, 21 14, 12 21Z" fill="#c6a664" />
      </svg>
      <Blossom spin className="h-7 w-7 shrink-0" />
      <svg width="9" height="8" viewBox="0 0 24 22" className="heartbeat shrink-0" style={{ animationDelay: "0.3s" }}>
        <path d="M12 21 C 3 14, 1 9, 4 5 C 7 2, 11 3, 12 7 C 13 3, 17 2, 20 5 C 23 9, 21 14, 12 21Z" fill="#c6a664" />
      </svg>
      <span className="grow-x origin-l h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-champagne" />
    </div>
  );
}
