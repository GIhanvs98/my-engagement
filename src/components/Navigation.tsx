"use client";

import { useEffect, useState, type ReactNode } from "react";
import { nav } from "@/data/wedding";
import { cn } from "@/lib/utils";

const ICONS: Record<string, ReactNode> = {
  "#home": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5v9.5a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z" />
    </svg>
  ),
  "#story": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  "#events": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  ),
  "#venue": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  "#rsvp": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

interface NavigationProps {
  isInsidePhone?: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Navigation({ isInsidePhone = false, containerRef }: NavigationProps) {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const rootEl = containerRef?.current || null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(`#${e.target.id}`);
          }
        });
      },
      {
        root: rootEl,
        rootMargin: "-30% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    nav.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [containerRef]);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    if (containerRef?.current) {
      // Smooth scroll inside phone mockup container
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActive(href);
  };

  return (
    <nav
      aria-label="Floating Navigation"
      className={cn(
        "z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border border-champagne/50 bg-ivory/95 backdrop-blur-md px-3 py-2 shadow-[0_12px_36px_-10px_rgba(100,44,44,0.4)] transition-all duration-300",
        isInsidePhone
          ? "absolute bottom-5 left-1/2 -translate-x-1/2 w-auto max-w-[92%]"
          : "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-auto max-w-[92%]"
      )}
    >
      {nav.map((item) => {
        const isActive = active === item.href;
        return (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            title={item.label}
            className={cn(
              "group relative flex items-center justify-center rounded-full transition-all duration-300 outline-none cursor-pointer",
              isActive
                ? "bg-maroon text-ivory px-3.5 py-2 shadow-sm"
                : "text-maroon/75 hover:text-maroon hover:bg-champagne/20 h-10 w-10"
            )}
          >
            {ICONS[item.href] || (
              <span className="font-body text-xs font-semibold">{item.label[0]}</span>
            )}

            {isActive && (
              <span className="ml-1.5 font-body text-[11px] tracking-wider uppercase font-medium whitespace-nowrap animate-[fadeIn_0.25s_ease]">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
