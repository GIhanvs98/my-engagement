import { dayTimeline } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";

export default function DayTimeline() {
  return (
    <section className="relative bg-ivory py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">The Schedule</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Our Engagement Day</h2>
          <p className="font-body text-sm sm:text-base text-ink-soft italic mt-2">A beautiful beginning to forever</p>
          <Ornament className="mt-5" />
        </ScrollReveal>

        {/* Mobile: horizontal scroll snap. Desktop (lg+): full 8-item connected row */}
        <div className="flex lg:grid lg:grid-cols-8 gap-0 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0 py-2">
          {dayTimeline.map((item, i) => (
            <ScrollReveal
              key={item.time}
              delay={(((i % 4) + 1) as 1 | 2 | 3 | 4)}
              className="relative shrink-0 w-[220px] sm:w-[240px] lg:w-auto snap-center px-3"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-display text-base sm:text-lg text-champagne-dark font-medium whitespace-nowrap">
                  {item.time}
                </span>

                <div className="relative w-full flex items-center justify-center my-4">
                  {i !== 0 && (
                    <span className="absolute top-1/2 left-0 right-1/2 h-px bg-champagne/40 -translate-y-1/2" />
                  )}
                  {i !== dayTimeline.length - 1 && (
                    <span className="absolute top-1/2 right-0 left-1/2 h-px bg-champagne/40 -translate-y-1/2" />
                  )}
                  <span className="ring-pulse absolute h-3 w-3 rounded-full bg-champagne/60" />
                  <span className="relative z-10 h-3 w-3 rounded-full bg-maroon border-2 border-champagne" />
                </div>

                <h3 className="font-body font-semibold text-xs sm:text-sm text-ink tracking-wide leading-snug">
                  {item.label}
                </h3>
                <p className="font-body text-[11px] sm:text-xs text-ink-soft mt-1.5 leading-relaxed">
                  {item.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom closing caption */}
        <ScrollReveal delay={2} className="text-center mt-12 sm:mt-16">
          <p className="font-display text-lg sm:text-xl text-maroon/90 italic tracking-wide">
            &ldquo;Two hearts, one beautiful journey.&rdquo;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
