"use client";

import { useEffect, useState } from "react";
import { music } from "@/data/wedding";
import { weddingAudio } from "@/lib/weddingAudio";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  className?: string;
  isInsidePhone?: boolean;
}

export default function MusicPlayer({ className, isInsidePhone = false }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((isPlaying) => {
      setPlaying(isPlaying);
    });

    const onOpen = () => {
      weddingAudio.play(music.src);
    };

    window.addEventListener("wedding:open", onOpen);

    return () => {
      unsubscribe();
      window.removeEventListener("wedding:open", onOpen);
    };
  }, []);

  const toggle = () => {
    weddingAudio.toggle(music.src);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause background music" : "Play background music"}
      title={music.title}
      className={cn(
        "z-[60] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-maroon text-ivory border border-champagne/40 shadow-[0_8px_24px_-6px_rgba(100,44,44,0.65)] transition-all duration-300 hover:scale-105 hover:bg-maroon-deep",
        isInsidePhone
          ? "absolute top-4 right-4"
          : "fixed top-4 right-4 sm:top-5 sm:right-5",
        className
      )}
    >
      {playing && (
        <span
          className="ring-pulse absolute inset-0 rounded-full bg-champagne/40 pointer-events-none"
          aria-hidden="true"
        />
      )}
      {playing ? (
        <span className="relative flex items-end gap-[3px] h-4" aria-hidden="true">
          <span className="sound-bar text-champagne-light" style={{ animationDelay: "0s" }} />
          <span className="sound-bar text-champagne-light" style={{ animationDelay: "0.2s" }} />
          <span className="sound-bar text-champagne-light" style={{ animationDelay: "0.4s" }} />
        </span>
      ) : (
        <svg
          className="relative text-ivory"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
          <circle cx="16.5" cy="16" r="2.5" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
