"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    []
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % gallery.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  return (
    <section id="gallery" className="relative bg-cream py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">Memories</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Photo Gallery</h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <div className="columns-2 sm:columns-3 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
          {gallery.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="break-inside-avoid">
              <button
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "card-3d relative w-full overflow-hidden rounded-xl group block border border-champagne/30 shadow-md",
                  photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                )}
                aria-label={`Open photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-maroon-deep/0 group-hover:bg-maroon-deep/15 transition-colors duration-500" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-cocoa/97 backdrop-blur-sm flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease]"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 text-ivory/85 hover:text-champagne-light text-3xl leading-none z-10"
            aria-label="Close"
          >
            &times;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 sm:left-6 text-ivory/70 hover:text-champagne-light text-4xl px-2 z-10"
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          <div
            className="relative w-full max-w-3xl aspect-[4/5] sm:aspect-[3/2] transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={gallery[activeIndex].src}
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 sm:right-6 text-ivory/70 hover:text-champagne-light text-4xl px-2 z-10"
            aria-label="Next photo"
          >
            &#8250;
          </button>

          <p className="absolute bottom-6 left-6 font-body text-xs text-ivory/70 tracking-wide">
            {activeIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
