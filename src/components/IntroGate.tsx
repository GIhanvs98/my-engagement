"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { couple, wedding, intro, music } from "@/data/wedding";
import Mandala from "./Mandala";
import PetalBurst from "./PetalBurst";
import { weddingAudio } from "@/lib/weddingAudio";
import { cn } from "@/lib/utils";

type GateState = "splash" | "opening-3d" | "playing" | "reveal" | "gone";

interface IntroGateProps {
  isInsidePhone?: boolean;
  onPhaseChange?: (phase: GateState) => void;
  onOpenComplete?: () => void;
}

export default function IntroGate({
  isInsidePhone = false,
  onPhaseChange,
  onOpenComplete,
}: IntroGateProps) {
  const [stage, setStage] = useState<GateState>("splash");
  const [guest, setGuest] = useState("");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scenes = intro.scenes || [
    {
      id: "proposal",
      image: intro.image || couple.couplePhoto,
      tagline: "The First Yes",
      title: "Where Forever Began",
      caption: "A question asked, a lifetime promised.",
      accent: "February 2025",
    },
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onPhaseChange?.(stage);
  }, [stage, onPhaseChange]);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return () => unsub();
  }, []);

  // Read ?to= from URL query params
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const to = new URLSearchParams(window.location.search).get("to");
      if (to) setGuest(to.slice(0, 60));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Lock scroll while intro gate is active
  useEffect(() => {
    if (!isInsidePhone) {
      document.body.style.overflow = stage === "gone" ? "" : "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [stage, isInsidePhone]);

  // Support replaying intro from anywhere in the app
  useEffect(() => {
    const onReplay = () => {
      setCurrentSceneIndex(0);
      setIsPaused(false);
      setStage("splash");
    };
    window.addEventListener("wedding:replay", onReplay);
    return () => window.removeEventListener("wedding:replay", onReplay);
  }, []);

  // Handle stage transitions
  const startReveal = useCallback(() => {
    setStage("reveal");
    window.scrollTo({ top: 0 });
    const target = document.getElementById("invitation-main");
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
    setTimeout(() => {
      setStage("gone");
      onOpenComplete?.();
    }, 850);
  }, [onOpenComplete]);

  // Handle opening 3D animation
  useEffect(() => {
    if (stage === "opening-3d") {
      const t = setTimeout(() => {
        setStage("playing");
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  // Handle cinematic scenes timer
  useEffect(() => {
    if (stage !== "playing" || isPaused) return;

    const duration = intro.sceneDuration || 4200;

    timerRef.current = setTimeout(() => {
      if (currentSceneIndex < scenes.length - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
      } else {
        startReveal();
      }
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stage, currentSceneIndex, isPaused, scenes.length, startReveal]);

  // Handle "Open Invitation" tap
  const handleOpenInvitation = () => {
    weddingAudio.play(music.src);
    window.dispatchEvent(new CustomEvent("wedding:open"));
    setStage("opening-3d");
  };

  // Handle "Skip" tap
  const handleSkip = () => {
    weddingAudio.play(music.src);
    window.dispatchEvent(new CustomEvent("wedding:open"));
    startReveal();
  };

  const toggleMusic = () => {
    weddingAudio.toggle(music.src);
  };

  const handleNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      startReveal();
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  if (stage === "gone") return null;

  const isFilmVisible = stage === "opening-3d" || stage === "playing";
  const isDoorsVisible = stage === "splash" || stage === "opening-3d";

  return (
    <div
      className={cn(
        "inset-0 overflow-hidden transition-all duration-700 select-none bg-[#0D0806] perspective-1200 preserve-3d",
        isInsidePhone ? "absolute z-50" : "fixed z-[100]",
        stage === "reveal" && "opacity-0 pointer-events-none scale-[0.98]"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic Engagement Invitation"
    >
      {/* ============================================================ */}
      {/* CINEMATIC WIDESCREEN FILM LAYER (Underneath 3D Doors)          */}
      {/* ============================================================ */}
      {isFilmVisible && (
        <div className="absolute inset-0 bg-[#0A0605] z-10 flex flex-col justify-between overflow-hidden">
          {/* Top Letterbox Cinema Bar */}
          <div className="relative z-30 w-full bg-black/85 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-champagne/15">
            {/* Story Reel Progress Segments */}
            <div className="flex items-center gap-1.5 flex-1 max-w-xs sm:max-w-md mr-4">
              {scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
                >
                  <div
                    className={cn(
                      "h-full bg-champagne transition-all duration-300",
                      idx < currentSceneIndex && "w-full",
                      idx === currentSceneIndex && "w-full animate-[film-bar-progress_4.2s_linear]",
                      idx > currentSceneIndex && "w-0"
                    )}
                  />
                </div>
              ))}
            </div>

            {/* Top Right Controls (Mute & Skip) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMusic}
                aria-label={isPlayingMusic ? "Mute music" : "Play music"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-champagne/30 text-ivory text-[11px] font-body tracking-wider uppercase backdrop-blur transition-all cursor-pointer"
              >
                {isPlayingMusic ? (
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="sound-bar" style={{ animationDelay: "0ms" }} />
                    <span className="sound-bar" style={{ animationDelay: "150ms" }} />
                    <span className="sound-bar" style={{ animationDelay: "300ms" }} />
                  </span>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                )}
                <span className="hidden sm:inline">{isPlayingMusic ? "Music On" : "Muted"}</span>
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center gap-1.5 rounded-full bg-maroon/85 hover:bg-maroon px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-body font-medium text-ivory border border-champagne/40 backdrop-blur transition-all hover:scale-105 cursor-pointer shadow-md"
              >
                <span>Enter</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Film Viewport & Active Slide */}
          <div className="relative flex-1 w-full overflow-hidden">
            {scenes.map((scene, idx) => {
              const isActive = idx === currentSceneIndex;
              const animClass = `anim-cinematic-${(idx % 4) + 1}`;

              return (
                <div
                  key={scene.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  )}
                >
                  {/* Photo with Ken Burns Motion */}
                  <div className={cn("absolute inset-0", isActive && animClass)}>
                    <Image
                      src={scene.image}
                      alt={scene.title}
                      fill
                      priority={idx <= 1}
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Cinematic Dark Vignette & Color Grading Overlays */}
                  <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60" />

                  {/* Golden Stardust Light Leak (top-right ambient bloom) */}
                  <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-champagne/15 blur-3xl pointer-events-none" />

                  {/* Floating Flower Petals */}
                  <PetalBurst count={24} />

                  {/* Centered Cinematic Title & Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-20 px-6 sm:px-12 text-center z-20 pointer-events-none">
                    <span className="font-body text-xs sm:text-sm uppercase tracking-[0.45em] text-champagne-light/95 drop-shadow-md">
                      {scene.tagline}
                    </span>

                    {/* Diamond Separator Line */}
                    <div className="my-3 flex items-center justify-center gap-3">
                      <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-champagne/80" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
                      <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-champagne/80 to-transparent" />
                    </div>

                    <h2
                      className="font-display italic text-3xl sm:text-5xl md:text-6xl text-ivory tracking-wide leading-tight max-w-3xl"
                      style={{ textShadow: "0 4px 30px rgba(0,0,0,0.85), 0 0 15px rgba(0,0,0,0.6)" }}
                    >
                      {scene.title}
                    </h2>

                    <p className="font-body text-xs sm:text-sm text-ivory/80 mt-2.5 max-w-md leading-relaxed drop-shadow-sm">
                      {scene.caption}
                    </p>

                    {scene.accent && (
                      <span className="mt-4 inline-block font-script text-xl sm:text-2xl text-champagne-light drop-shadow">
                        {scene.accent}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Click Navigation Overlays (Left for prev, Right for next) */}
            <div
              onClick={handlePrevScene}
              className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-w-resize"
              title="Previous chapter"
            />
            <div
              onClick={handleNextScene}
              className="absolute inset-y-0 right-0 w-3/4 z-20 cursor-e-resize"
              title="Next chapter"
            />
          </div>

          {/* Bottom Letterbox Cinema Bar with Scene Indicators & Pause/Resume */}
          <div className="relative z-30 w-full bg-black/85 backdrop-blur-md px-6 py-3 flex items-center justify-between border-t border-champagne/15 text-ivory/60 text-[10px] font-body tracking-[0.25em] uppercase">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span>
                Chapter {currentSceneIndex + 1} of {scenes.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="hover:text-ivory transition-colors cursor-pointer"
            >
              {isPaused ? "▶ Resume" : "❚❚ Pause"}
            </button>

            <span className="hidden sm:inline text-champagne-light/70">
              Gihan &amp; Onela &bull; Engagement 2026
            </span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3D ROYAL ENVELOPE / BIFOLD DOORS (Cover Gate Layer)           */}
      {/* ============================================================ */}
      {isDoorsVisible && (
        <div
          className={cn(
            "absolute inset-0 z-30 preserve-3d perspective-1200 transition-opacity duration-300",
            stage === "opening-3d" && "gate-open"
          )}
        >
          {/* LEFT 3D DOOR */}
          <div
            className="gate-door-3d-left absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#F6EEDF] border-r border-[#D2B97A]/50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(246, 238, 223, 0.7), rgba(246, 238, 223, 0.7)), radial-gradient(ellipse at center, #FFFDF8 0%, #EDE1CB 100%)",
            }}
          >
            {/* Left Mandala Half */}
            <div className="pointer-events-none absolute left-[100%] -top-[14rem] sm:-top-[21rem] w-[28rem] sm:w-[42rem] -translate-x-1/2 select-none opacity-50">
              <Mandala immediate className="w-full h-auto drop-shadow-[0_6px_14px_rgba(142,116,39,0.18)]" />
            </div>

            {/* Left Rising Sparks */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {[15, 40, 70].map((leftPct, i) => (
                <span
                  key={i}
                  className="spark-rise rounded-full"
                  style={
                    {
                      left: `${leftPct}%`,
                      width: `${3 + (i % 3)}px`,
                      height: `${3 + (i % 3)}px`,
                      background:
                        "radial-gradient(circle, rgba(210, 185, 122, 0.9) 0%, rgba(184, 154, 71, 0) 70%)",
                      ["--sd" as string]: `${6 + i * 2}s`,
                      ["--sdelay" as string]: `${i * 0.9}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* Inner Gold Frame Border */}
            <div className="pointer-events-none absolute inset-3 sm:inset-4 border-l border-y border-[#B89A47]/35 rounded-l-2xl" />
          </div>

          {/* RIGHT 3D DOOR */}
          <div
            className="gate-door-3d-right absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#F6EEDF] border-l border-[#D2B97A]/50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(246, 238, 223, 0.7), rgba(246, 238, 223, 0.7)), radial-gradient(ellipse at center, #FFFDF8 0%, #EDE1CB 100%)",
            }}
          >
            {/* Right Mandala Half */}
            <div className="pointer-events-none absolute right-[100%] -top-[14rem] sm:-top-[21rem] w-[28rem] sm:w-[42rem] translate-x-1/2 select-none opacity-50">
              <Mandala immediate className="w-full h-auto drop-shadow-[0_6px_14px_rgba(142,116,39,0.18)]" />
            </div>

            {/* Right Rising Sparks */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {[30, 60, 85].map((leftPct, i) => (
                <span
                  key={i}
                  className="spark-rise rounded-full"
                  style={
                    {
                      left: `${leftPct}%`,
                      width: `${3 + (i % 3)}px`,
                      height: `${3 + (i % 3)}px`,
                      background:
                        "radial-gradient(circle, rgba(210, 185, 122, 0.9) 0%, rgba(184, 154, 71, 0) 70%)",
                      ["--sd" as string]: `${7 + i * 2}s`,
                      ["--sdelay" as string]: `${i * 1.2}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* Inner Gold Frame Border */}
            <div className="pointer-events-none absolute inset-3 sm:inset-4 border-r border-y border-[#B89A47]/35 rounded-r-2xl" />
          </div>

          {/* Sound Toggle Button (Top Right of Cover) */}
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlayingMusic ? "Turn music off" : "Turn music on"}
            className={cn(
              "absolute right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 active:scale-90 sm:right-6 sm:top-6 cursor-pointer",
              stage === "opening-3d" && "opacity-0 pointer-events-none"
            )}
            style={{
              background: isPlayingMusic
                ? "linear-gradient(135deg, #7A1F1A, #5C140F)"
                : "rgba(251, 245, 230, 0.95)",
              color: isPlayingMusic ? "#FFFDF8" : "#5C140F",
              border: `1px solid ${isPlayingMusic ? "rgba(232, 216, 171, 0.55)" : "rgba(184, 154, 71, 0.5)"}`,
              boxShadow: "0 14px 28px -14px rgba(142, 116, 39, 0.6)",
            }}
          >
            {isPlayingMusic ? (
              <span className="relative flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <span className="ring-pulse absolute inset-[-8px] rounded-full border border-champagne-light/55" />
              </span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Center Card & 3D Wax Seal (Splits open during opening-3d) */}
          <div
            className={cn(
              "absolute inset-0 z-30 flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-all duration-300",
              stage === "opening-3d" ? "opacity-0 scale-90 pointer-events-none" : "opacity-100"
            )}
          >
            {/* Top Subtitle */}
            <span
              className="text-[0.66rem] uppercase tracking-[0.42em]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                color: "#8E7427",
                fontWeight: 600,
              }}
            >
              The Engagement Celebration Of
            </span>

            {/* Diamond Gradient Separator Line */}
            <div className="mt-3.5 mb-2 flex items-center justify-center">
              <span className="inline-flex items-center justify-center gap-2.5 w-[140px]" aria-hidden="true">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D2B97A]" />
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#B89A47]" />
                <span className="h-px flex-1 bg-gradient-to-r from-[#D2B97A] to-transparent" />
              </span>
            </div>

            {/* Couple Names */}
            <h1
              className="leading-[1.1] my-2"
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: "#7A1F1A",
                fontSize: "clamp(2.3rem, 8vw, 3.8rem)",
              }}
            >
              <span>{couple.groomFirstName}</span>
              <span className="font-script not-italic mx-2 text-[#8E7427] font-normal">&amp;</span>
              <span>{couple.brideFirstName}</span>
            </h1>

            {/* Date & Location */}
            <p
              className="mt-1 text-[0.88rem] tracking-wide"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                color: "#473C1F",
              }}
            >
              {wedding.dayOfWeek}, {wedding.displayDate}
            </p>

            {/* Personalized Guest Badge */}
            <div className="mt-6 w-full max-w-[22rem] px-4 py-2.5 rounded-xl bg-champagne/15 border border-champagne/40 backdrop-blur-xs">
              <p
                className="text-[0.62rem] uppercase tracking-[0.34em]"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  color: "#7C6A48",
                  fontWeight: 600,
                }}
              >
                Cordially Inviting
              </p>
              <p
                className="mt-0.5 text-base sm:text-lg font-bold tracking-wider uppercase text-maroon font-display"
              >
                {guest || "Our Cherished Guest"}
              </p>
            </div>

            {/* 3D ROYAL WAX SEAL BUTTON */}
            <div className="mt-8 relative flex flex-col items-center">
              <button
                type="button"
                onClick={handleOpenInvitation}
                tabIndex={0}
                aria-label="Open Engagement Invitation"
                className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 wax-seal-glow"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #8A2520 0%, #641915 60%, #420C0A 100%)",
                  border: "3px solid #D4B26F",
                  boxShadow:
                    "0 15px 35px -8px rgba(66, 12, 10, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Embossed Wax Seal Ring */}
                <span className="absolute inset-2 rounded-full border border-dashed border-[#D4B26F]/60 pointer-events-none" />

                {/* Monogram G & O */}
                <span className="font-display italic text-2xl sm:text-3xl font-bold text-[#FDF9EE] drop-shadow-md tracking-tighter">
                  G<span className="font-script text-lg sm:text-xl text-[#E5CA8F] mx-0.5">&amp;</span>O
                </span>

                <span className="text-[8px] uppercase tracking-[0.25em] text-[#E5CA8F] mt-0.5 font-body font-semibold">
                  Unveil
                </span>
              </button>

              <span className="mt-3.5 text-[0.64rem] uppercase tracking-[0.28em] text-[#8E7427] font-body font-semibold animate-pulse">
                Tap Seal to Open
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
