"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { couple, wedding, intro, music } from "@/data/wedding";
import Mandala from "./Mandala";
import PetalBurst from "./PetalBurst";
import PeraharaProcession from "./PeraharaProcession";
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
      setStage("splash");
    };
    window.addEventListener("wedding:replay", onReplay);
    return () => window.removeEventListener("wedding:replay", onReplay);
  }, []);

  // Handle film duration and reveal transition
  useEffect(() => {
    if (stage === "opening-3d") {
      const t = window.setTimeout(() => {
        setStage("playing");
      }, 950);
      return () => window.clearTimeout(t);
    }
    if (stage === "playing") {
      const durationSeconds = intro.video ? 20 : intro.seconds || 9;
      const t = window.setTimeout(() => setStage("reveal"), durationSeconds * 1000);
      return () => window.clearTimeout(t);
    }
    if (stage === "reveal") {
      window.scrollTo({ top: 0 });
      const target = document.getElementById("invitation-main");
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
      }
      const t = window.setTimeout(() => {
        setStage("gone");
        onOpenComplete?.();
      }, 950);
      return () => window.clearTimeout(t);
    }
  }, [stage, onOpenComplete]);

  // Handle "Open Invitation" tap with 3D Door Swing
  const handleOpenInvitation = () => {
    weddingAudio.play(music.src);
    window.dispatchEvent(new CustomEvent("wedding:open"));
    setStage("opening-3d");
  };

  // Handle "Skip" tap
  const handleSkip = () => {
    weddingAudio.play(music.src);
    window.dispatchEvent(new CustomEvent("wedding:open"));
    setStage("reveal");
  };

  const toggleMusic = () => {
    weddingAudio.toggle(music.src);
  };

  if (stage === "gone") return null;

  const isFilmVisible = stage === "opening-3d" || stage === "playing";
  const isDoorsVisible = stage === "splash" || stage === "opening-3d";

  return (
    <div
      className={cn(
        "inset-0 overflow-hidden transition-all duration-700 select-none bg-[#F5EDDC] perspective-1200 preserve-3d",
        isInsidePhone ? "absolute z-50" : "fixed z-[100]",
        stage === "reveal" && "opacity-0 pointer-events-none scale-[0.98]"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Engagement Invitation Gate"
    >
      {/* ============================================================ */}
      {/* BACKGROUND FILM LAYER (Underneath 3D Doors)                   */}
      {/* ============================================================ */}
      {isFilmVisible && (
        <div className="absolute inset-0 bg-[#160A02] animate-[fadeIn_0.5s_ease] z-10">
          {intro.video ? (
            <video
              src={intro.video}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
              onEnded={() => setStage("reveal")}
            />
          ) : (
            <div className="absolute inset-0 kenburns">
              <Image
                src={intro.image || couple.couplePhoto}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Cinematic dark gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />

          {/* Sweeping large flower petals burst in 3D */}
          <PetalBurst count={36} />

          {/* Overlaid Engagement Title with soft glowing text shadow */}
          <div
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center text-white"
            style={{
              textShadow: "0 2px 22px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <span
              className="text-[0.68rem] sm:text-[0.82rem] uppercase tracking-[0.42em] text-white/90"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 600,
              }}
            >
              The Engagement Of
            </span>

            {/* Diamond Separator Line */}
            <span aria-hidden="true" className="my-3 flex items-center gap-2 text-white/85">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/85" />
              <span className="h-1.5 w-1.5 rotate-45 bg-white/90" />
              <span className="h-px w-8 bg-gradient-to-r from-white/85 to-transparent" />
            </span>

            <p
              className="leading-[1.05] mt-1 mb-2"
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: "#FFFFFF",
                fontSize: "clamp(2.4rem, 8.5vw, 4.2rem)",
                letterSpacing: "-0.005em",
              }}
            >
              {couple.groomFirstName}{" "}
              <span className="font-script not-italic text-champagne-light mx-1">&amp;</span>{" "}
              {couple.brideFirstName}
            </p>

            <span
              className="mt-3 text-[0.68rem] sm:text-[0.8rem] uppercase tracking-[0.34em] text-white/85"
              style={{
                fontFamily: "var(--font-body), sans-serif",
              }}
            >
              {wedding.displayDate}
            </span>
          </div>

          {/* "Skip" Button (bottom right pill) */}
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip to invitation"
            className="absolute bottom-5 right-5 z-30 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.66rem] uppercase tracking-[0.26em] backdrop-blur transition-all duration-200 hover:bg-black/60 sm:bottom-7 sm:right-7 cursor-pointer"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 600,
              background: "rgba(0, 0, 0, 0.45)",
              color: "#FFFDF8",
              border: "1px solid rgba(255, 253, 248, 0.4)",
            }}
          >
            Skip
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3D ROYAL BIFOLD GATE DOORS (Splits open in 3D perspective)    */}
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
            className="gate-door-3d-left absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#F5EDDC] border-r border-[#D2B97A]/50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245, 237, 220, 0.5), rgba(245, 237, 220, 0.5)), radial-gradient(ellipse at center, #fffdf8 0%, #f4ead6 100%)",
            }}
          >
            {/* Left Mandala Half */}
            <div className="pointer-events-none absolute left-[100%] -top-[14rem] sm:-top-[21rem] w-[28rem] sm:w-[42rem] -translate-x-1/2 select-none opacity-55">
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

            {/* Left Perahara Artwork Half */}
            <div className="absolute bottom-0 left-0 w-[200%] pb-1 pointer-events-none">
              <PeraharaProcession className="w-full" />
            </div>

            {/* Subtle inner gold frame border */}
            <div className="pointer-events-none absolute inset-2 sm:inset-3 border-l border-y border-[#B89A47]/30 rounded-l-2xl" />
          </div>

          {/* RIGHT 3D DOOR */}
          <div
            className="gate-door-3d-right absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#F5EDDC] border-l border-[#D2B97A]/50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245, 237, 220, 0.5), rgba(245, 237, 220, 0.5)), radial-gradient(ellipse at center, #fffdf8 0%, #f4ead6 100%)",
            }}
          >
            {/* Right Mandala Half */}
            <div className="pointer-events-none absolute right-[100%] -top-[14rem] sm:-top-[21rem] w-[28rem] sm:w-[42rem] translate-x-1/2 select-none opacity-55">
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

            {/* Right Perahara Artwork Half */}
            <div className="absolute bottom-0 right-0 w-[200%] pb-1 pointer-events-none">
              <PeraharaProcession className="w-full" />
            </div>

            {/* Subtle inner gold frame border */}
            <div className="pointer-events-none absolute inset-2 sm:inset-3 border-r border-y border-[#B89A47]/30 rounded-r-2xl" />
          </div>

          {/* Top Right Music Toggle Button */}
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlayingMusic ? "Turn music off" : "Turn music on"}
            title={isPlayingMusic ? "Turn music off" : "Turn music on"}
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <span className="ring-pulse absolute inset-[-8px] rounded-full border border-champagne-light/55" />
              </span>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Center Card Content Overlay (Fades out when 3D doors swing open) */}
          <div
            className={cn(
              "absolute inset-0 z-30 flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-all duration-300",
              stage === "opening-3d" ? "opacity-0 scale-90 pointer-events-none" : "opacity-100"
            )}
          >
            {/* "The Engagement Of" Label */}
            <span
              className="text-[0.66rem] uppercase tracking-[0.4em]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                color: "#8E7427",
                fontWeight: 600,
              }}
            >
              The Engagement Of
            </span>

            {/* Diamond Gradient Separator Line */}
            <div className="mt-4 mb-2 flex items-center justify-center">
              <span className="inline-flex items-center justify-center gap-2.5 w-[140px]" aria-hidden="true">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D2B97A]" />
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#B89A47]" />
                <span className="h-px flex-1 bg-gradient-to-r from-[#D2B97A] to-transparent" />
              </span>
            </div>

            {/* Couple Names */}
            <p
              className="leading-[1.1] my-2"
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: "#7A1F1A",
                fontSize: "clamp(2.1rem, 7.5vw, 3.4rem)",
              }}
            >
              <span>{couple.groomFirstName}</span>
              <span className="font-script not-italic mx-2 text-[#8E7427] font-normal">&amp;</span>
              <span>{couple.brideFirstName}</span>
            </p>

            {/* Wedding Date */}
            <p
              className="mt-2 text-[0.88rem]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                color: "#473C1F",
              }}
            >
              {wedding.dayOfWeek}, {wedding.displayDate}
            </p>

            {/* "Open Invitation" Button with 3D tactile hover */}
            <button
              type="button"
              onClick={handleOpenInvitation}
              tabIndex={0}
              className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[0.66rem] uppercase tracking-[0.26em] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer card-3d"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 700,
                background: "rgba(255, 253, 248, 0.85)",
                color: "#5C140F",
                border: "1.5px solid #7A1F1A",
                boxShadow: "0 6px 20px -6px rgba(122, 31, 26, 0.25)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-180 text-[#7A1F1A]"
                aria-hidden="true"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              Open Invitation
            </button>

            {/* Personalized Guest Greeting */}
            <div className="mt-7 w-full max-w-[20rem] px-3">
              <p
                className="text-[0.62rem] uppercase tracking-[0.34em]"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  color: "#7C6A48",
                  fontWeight: 600,
                }}
              >
                Dear
              </p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  color: "#2A2112",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  textTransform: "uppercase",
                  fontSize: "1.05rem",
                  letterSpacing: "0.18em",
                }}
              >
                {guest || "Beloved Guest"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
