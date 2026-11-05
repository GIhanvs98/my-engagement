import Image from "next/image";
import { venue } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";

export default function Venue() {
  return (
    <section id="venue" className="relative bg-ivory py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">Find Us</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">The Venue</h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="card-3d relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden border border-champagne/40 shadow-[0_25px_60px_-25px_rgba(107,29,42,0.4)]">
            <Image src={venue.image} alt={venue.name} fill priority sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl text-ivory">{venue.name}</h3>
              <p className="font-body text-sm text-ivory/85 mt-1">{venue.address}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2} className="mt-6 sm:mt-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-champagne/40 shadow-sm">
            <iframe
              src={venue.mapEmbedUrl}
              title="Venue map"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="text-center mt-7">
            <a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-maroon px-7 py-3 text-xs tracking-[0.2em] uppercase font-medium text-maroon transition-colors hover:bg-maroon hover:text-ivory"
            >
              Get Directions
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
