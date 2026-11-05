import { dressCode } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import FloralCorner from "./FloralCorner";

export default function DressCode() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-28 px-6">
      <FloralCorner rotate={0} className="top-0 left-0 w-28 h-28 sm:w-48 sm:h-48 opacity-70" />
      <FloralCorner rotate={180} className="bottom-0 right-0 w-28 h-28 sm:w-48 sm:h-48 opacity-70" />
      <ScrollReveal className="max-w-lg mx-auto text-center">
        <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">Attire</p>
        <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">{dressCode.heading}</h2>
        <Ornament className="mt-5" />
        <p className="font-display italic text-xl sm:text-2xl text-champagne-dark mt-6">{dressCode.style}</p>
        <p className="font-body text-sm text-ink-soft mt-4 leading-relaxed">{dressCode.description}</p>

        <div className="flex items-center justify-center gap-3 mt-8">
          {dressCode.palette.map((color) => (
            <span
              key={color}
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-black/5 shadow-sm"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
