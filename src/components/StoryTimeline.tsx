import Image from "next/image";
import { story } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import GrowLine from "./GrowLine";
import FloralCorner from "./FloralCorner";
import { cn } from "@/lib/utils";

export default function StoryTimeline() {
  return (
    <section id="story" className="relative bg-ivory py-24 sm:py-32 px-6 overflow-hidden">
      <FloralCorner rotate={0} className="top-0 left-0 w-32 h-32 sm:w-56 sm:h-56 opacity-70" />
      <FloralCorner rotate={180} className="bottom-0 right-0 w-32 h-32 sm:w-56 sm:h-56 opacity-70" />
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">Our Journey</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Our Love Story</h2>
          <p className="font-body text-sm sm:text-base text-ink-soft mt-5 max-w-md mx-auto leading-relaxed">With hearts full of gratitude, we invite you to witness the beginning of our forever, surrounded by the family and friends who mean the world to us.</p>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <div className="relative">
          <div className="hidden sm:block"><GrowLine /></div>

          <div className="flex flex-col gap-16 sm:gap-24">
            {story.map((chapter, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={chapter.title}
                  className={cn(
                    "relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12",
                    reverse && "sm:flex-row-reverse"
                  )}
                >
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 h-3.5 w-3.5 items-center justify-center">
                    <span className="ring-pulse absolute inset-0 rounded-full bg-champagne/60" />
                    <span className="relative h-3.5 w-3.5 rounded-full bg-champagne border-4 border-ivory shadow-sm" />
                  </div>

                  <ScrollReveal className="sm:w-1/2 w-full">
                    <div className="card-3d relative aspect-[4/3] w-full max-w-md mx-auto rounded-2xl p-2 bg-cream-card border border-champagne/60 shadow-[0_20px_50px_-20px_rgba(100,44,44,0.3)]">
                      <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-champagne/40">
                        <Image
                          src={chapter.image}
                          alt={chapter.title}
                          fill
                          sizes="(max-width: 640px) 90vw, 45vw"
                          className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                        />
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={2} className={cn("sm:w-1/2 w-full text-center", reverse ? "sm:text-right" : "sm:text-left")}>
                    <span className="font-script text-3xl text-champagne">{chapter.year}</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-maroon mt-1 mb-3">{chapter.title}</h3>
                    <p className="font-body text-sm sm:text-base text-ink-soft leading-relaxed max-w-sm sm:mx-0 mx-auto">
                      {chapter.description}
                    </p>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
