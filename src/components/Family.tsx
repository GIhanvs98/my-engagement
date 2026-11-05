import { family } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import FloralCorner from "./FloralCorner";

export default function Family() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28 px-6">
      <FloralCorner rotate={0} className="top-0 left-0 w-28 h-28 sm:w-48 sm:h-48 opacity-70" />
      <FloralCorner rotate={180} className="bottom-0 right-0 w-28 h-28 sm:w-48 sm:h-48 opacity-70" />
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">With Gratitude</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Our Families</h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-10 sm:gap-6 text-center">
          <ScrollReveal delay={1}>
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-champagne-dark mb-2">
              {family.bride.heading}
            </p>
            <p className="font-body text-xs text-ink-soft mb-3">{family.bride.note}</p>
            {family.bride.parents.map((p) => (
              <p key={p} className="font-display text-xl sm:text-2xl text-maroon">{p}</p>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-champagne-dark mb-2">
              {family.groom.heading}
            </p>
            <p className="font-body text-xs text-ink-soft mb-3">{family.groom.note}</p>
            {family.groom.parents.map((p) => (
              <p key={p} className="font-display text-xl sm:text-2xl text-maroon">{p}</p>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
