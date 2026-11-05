import { dayTimeline } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";

export default function DayTimeline() {
  return (
    <section className="relative bg-ivory py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">The Schedule</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Engagement Day Timeline</h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        {/* Mobile: horizontal scroll snap. Desktop: full row */}
        <div className="flex sm:grid sm:grid-cols-6 gap-0 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0">
          {dayTimeline.map((item, i) => (
            <ScrollReveal
              key={item.time}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="relative shrink-0 w-[62vw] sm:w-auto snap-start px-4 sm:px-3 first:pl-0 last:pr-0"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-display text-lg sm:text-xl text-champagne-dark">{item.time}</span>
                <div className="relative w-full flex items-center justify-center my-4">
                  <span className="hidden sm:block absolute top-1/2 left-0 right-1/2 h-px bg-champagne/30 -translate-y-1/2 first:hidden" />
                  <span className="hidden sm:block absolute top-1/2 right-0 left-1/2 h-px bg-champagne/30 -translate-y-1/2" />
                  <span className="ring-pulse absolute h-3 w-3 rounded-full bg-champagne/60" />
                  <span className="relative z-10 h-3 w-3 rounded-full bg-maroon border-2 border-champagne" />
                </div>
                <h3 className="font-body font-medium text-sm text-ink tracking-wide">{item.label}</h3>
                <p className="font-body text-xs text-ink-soft mt-1.5 leading-relaxed">{item.note}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
