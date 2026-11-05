"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/** Timeline spine that draws itself down the page when it enters view. */
export default function GrowLine({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <div ref={ref} className={cn("absolute inset-0 pointer-events-none", inView && "is-drawn", className)} aria-hidden="true">
      <div className="grow-y absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-champagne via-champagne/60 to-champagne/10" />
    </div>
  );
}
