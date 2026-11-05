import Image from "next/image";
import { couple, wedding } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import FloralCorner from "./FloralCorner";

export default function CoupleIntroduction() {
  return (
    <section id="couple" className="relative bg-ivory overflow-hidden">
      {/* 1. Cinematic Couple Showcase */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] max-h-[560px] overflow-hidden">
        <Image
          src={couple.couplePhoto}
          alt={`${couple.groomFirstName} & ${couple.brideFirstName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft vignette & luxury burgundy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/40 to-cocoa/30" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 sm:p-10 text-white z-10 pb-12 sm:pb-16">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.45em] uppercase text-champagne-light drop-shadow">
            A Union of Two Souls
          </p>
          <blockquote className="mt-3 max-w-lg font-display italic text-2xl sm:text-3xl text-ivory drop-shadow-md leading-relaxed">
            &ldquo;{couple.quote}&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-champagne-light/60" />
            <span className="font-script text-2xl text-champagne-light">forever</span>
            <span className="h-px w-10 bg-champagne-light/60" />
          </div>
        </div>
      </div>

      {/* 2. Couple Profiles / Introduction Section */}
      <div className="relative py-20 sm:py-28 px-6">
        <FloralCorner rotate={0} className="top-0 left-0 w-28 h-28 sm:w-48 sm:h-48 opacity-75" />
        <FloralCorner rotate={90} className="top-0 right-0 w-28 h-28 sm:w-48 sm:h-48 opacity-75" />

        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14 sm:mb-16">
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">
              Meet the Couple
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">
              The Bride &amp; Groom
            </h2>
            <Ornament className="mt-5" />
            <p className="font-body text-sm sm:text-base text-ink-soft mt-5 max-w-lg mx-auto leading-relaxed">
              {wedding.welcomeMessage}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-14 items-center">
            {/* Groom Profile */}
            <ScrollReveal delay={1} className="flex flex-col items-center text-center">
              <div className="card-3d relative w-44 sm:w-52 aspect-[3/4] rounded-t-full p-2 bg-cream-card border border-champagne/60 shadow-[0_18px_45px_-18px_rgba(100,44,44,0.35)]">
                <div className="relative w-full h-full rounded-t-full overflow-hidden ring-1 ring-champagne/40">
                  <Image
                    src={couple.groomPhoto}
                    alt={couple.groomFullName}
                    fill
                    sizes="(max-width: 640px) 200px, 240px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-maroon mt-6">
                {couple.groomFullName}
              </h3>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-champagne-dark mt-1">
                {couple.groomRole}
              </p>
              <p className="font-body text-sm text-ink-soft mt-3 max-w-xs leading-relaxed">
                {couple.groomBio}
              </p>
            </ScrollReveal>

            {/* Bride Profile */}
            <ScrollReveal delay={2} className="flex flex-col items-center text-center">
              <div className="card-3d relative w-44 sm:w-52 aspect-[3/4] rounded-t-full p-2 bg-cream-card border border-champagne/60 shadow-[0_18px_45px_-18px_rgba(100,44,44,0.35)]">
                <div className="relative w-full h-full rounded-t-full overflow-hidden ring-1 ring-champagne/40">
                  <Image
                    src={couple.bridePhoto}
                    alt={couple.brideFullName}
                    fill
                    sizes="(max-width: 640px) 200px, 240px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-maroon mt-6">
                {couple.brideFullName}
              </h3>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-champagne-dark mt-1">
                {couple.brideRole}
              </p>
              <p className="font-body text-sm text-ink-soft mt-3 max-w-xs leading-relaxed">
                {couple.brideBio}
              </p>
            </ScrollReveal>
          </div>

          {/* Invitation Badge */}
          <ScrollReveal delay={3} className="mt-14 sm:mt-16 text-center">
            <div className="inline-block rounded-full bg-cream px-8 py-3.5 border border-champagne/40 shadow-sm">
              <p className="font-display italic text-base sm:text-lg text-maroon">
                Celebrating on {wedding.dayOfWeek}, {wedding.displayDate}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
