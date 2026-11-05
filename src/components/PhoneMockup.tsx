"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Mandala from "./Mandala";
import FloralCorner from "./FloralCorner";
import Petals from "./Petals";
import Butterfly from "./Butterfly";
import { couple, wedding } from "@/data/wedding";
import { cn } from "@/lib/utils";

type View3DMode = "3d-interactive" | "3d-angle" | "flat";

interface PhoneMockupProps {
  children: (props: {
    isInsidePhone: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
  }) => ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [fullWidthMode, setFullWidthMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("9:41");
  const [viewMode, setViewMode] = useState<View3DMode>("3d-interactive");
  const [rotate, setRotate] = useState({ x: 3.5, y: -6.5 });
  const [glare, setGlare] = useState({ x: 35, y: 25 });
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    // Update phone status bar clock
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
      clearInterval(interval);
    };
  }, []);

  // Interactive 3D mouse tracking across desktop screen
  useEffect(() => {
    if (!isDesktop || fullWidthMode || viewMode !== "3d-interactive") return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPct = e.clientX / innerWidth - 0.5; // -0.5 to 0.5
      const yPct = e.clientY / innerHeight - 0.5;

      // Dampen rotation slightly when mouse is inside the phone for comfortable scrolling
      const factor = isHoveringPhone ? 0.35 : 1;
      const targetRotateY = (xPct * 18 - 4) * factor;
      const targetRotateX = (-yPct * 14 + 3) * factor;

      setRotate({ x: targetRotateX, y: targetRotateY });
      setGlare({
        x: Math.max(10, Math.min(90, (xPct + 0.5) * 100)),
        y: Math.max(10, Math.min(90, (yPct + 0.5) * 100)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, fullWidthMode, viewMode, isHoveringPhone]);

  const showPhoneFrame = isDesktop && !fullWidthMode;

  // Calculate 3D transform based on viewMode
  let phoneTransform = "";
  if (showPhoneFrame) {
    if (viewMode === "3d-interactive") {
      phoneTransform = `perspective(1400px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) rotateZ(1.2deg)`;
    } else if (viewMode === "3d-angle") {
      phoneTransform = "perspective(1400px) rotateX(6deg) rotateY(-11deg) rotateZ(2.2deg)";
    } else {
      phoneTransform = "none";
    }
  }

  return (
    <div
      className={cn(
        "relative w-full min-h-screen transition-colors duration-500",
        showPhoneFrame
          ? "h-screen overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_top,#fffdf8,#f0e5d1_80%)] perspective-1500"
          : "bg-ivory"
      )}
    >
      {/* ============================================================ */}
      {/* DESKTOP-ONLY ENVIRONMENT (Visible only on desktop screens)    */}
      {/* ============================================================ */}
      {showPhoneFrame && (
        <>
          {/* Subtle floral corners for desktop workspace */}
          <FloralCorner rotate={0} className="top-4 left-4 w-36 h-36 opacity-60 pointer-events-none" />
          <FloralCorner rotate={90} className="top-4 right-4 w-36 h-36 opacity-60 pointer-events-none" />
          <FloralCorner rotate={270} className="bottom-4 left-4 w-36 h-36 opacity-60 pointer-events-none" />
          <FloralCorner rotate={180} className="bottom-4 right-4 w-36 h-36 opacity-60 pointer-events-none" />

          {/* Desktop background ambient elements */}
          <Mandala className="pointer-events-none absolute left-[10%] top-[40%] -translate-y-1/2 w-[340px] opacity-25" />
          <Mandala className="pointer-events-none absolute right-[10%] top-[40%] -translate-y-1/2 w-[340px] opacity-25" />
          <Petals count={8} />

          <div className="pointer-events-none absolute left-[12%] top-[24%]">
            <div className="flutter-a">
              <Butterfly className="w-9" />
            </div>
          </div>

          {/* Desktop Left Editorial Info */}
          <aside className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-start max-w-xs text-left z-20 pointer-events-auto">
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-champagne-dark">
              Digital Engagement Experience
            </span>
            <div className="my-2 h-px w-12 bg-champagne" />
            <h2 className="font-display italic text-4xl text-maroon leading-tight">
              {couple.groomFirstName} <span className="font-script not-italic text-champagne text-3xl">&amp;</span> {couple.brideFirstName}
            </h2>
            <p className="font-body text-xs text-ink-soft mt-3 leading-relaxed">
              Traditional Sri Lankan Nilame invitation crafted for modern elegance and mobile intimacy.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 font-body text-xs text-ink-soft border-l border-champagne/40 pl-3">
              <span className="font-medium text-maroon">{wedding.dayOfWeek}, {wedding.displayDate}</span>
              <span>Rockhill Reception Hall, Homagama</span>
              <span className="text-champagne-dark text-[11px] font-medium mt-1">
                {viewMode === "3d-interactive" ? "Hover & move mouse for 3D depth" : "Scroll inside phone to view"} &rarr;
              </span>
            </div>
          </aside>

          {/* Desktop Right Mode Switcher & 3D Controls */}
          <aside className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-end max-w-xs text-right z-20 pointer-events-auto">
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-champagne-dark">
              3D Interactive Showcase
            </span>
            <p className="font-display text-lg text-maroon mt-1">Realistic 3D iPhone</p>
            <p className="font-body text-xs text-ink-soft mt-2 leading-relaxed">
              Toggle 3D perspective or switch to front view and full screen mode.
            </p>

            {/* 3D Mode Selector Buttons */}
            <div className="mt-5 flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 bg-cream/70 p-1 rounded-full border border-champagne/40 shadow-inner">
                <button
                  type="button"
                  onClick={() => setViewMode("3d-interactive")}
                  className={cn(
                    "px-3 py-1 text-[11px] font-body rounded-full transition-all cursor-pointer",
                    viewMode === "3d-interactive"
                      ? "bg-maroon text-ivory shadow-sm font-semibold"
                      : "text-maroon/80 hover:text-maroon"
                  )}
                  title="Dynamic 3D tilt tracking mouse"
                >
                  3D Dynamic
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("3d-angle")}
                  className={cn(
                    "px-3 py-1 text-[11px] font-body rounded-full transition-all cursor-pointer",
                    viewMode === "3d-angle"
                      ? "bg-maroon text-ivory shadow-sm font-semibold"
                      : "text-maroon/80 hover:text-maroon"
                  )}
                  title="Fixed 3D isometric angle"
                >
                  3D Angle
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("flat")}
                  className={cn(
                    "px-3 py-1 text-[11px] font-body rounded-full transition-all cursor-pointer",
                    viewMode === "flat"
                      ? "bg-maroon text-ivory shadow-sm font-semibold"
                      : "text-maroon/80 hover:text-maroon"
                  )}
                  title="Flat front view"
                >
                  Flat
                </button>
              </div>

              <button
                type="button"
                onClick={() => setFullWidthMode(true)}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-champagne/60 bg-cream-card px-4 py-2 text-xs font-body tracking-wider uppercase text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-sm cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                Expanded View
              </button>
            </div>
          </aside>

          {/* Floating return toggle for small desktop screens */}
          <div className="xl:hidden fixed top-4 left-4 z-50 flex items-center gap-2">
            <button
              onClick={() => setFullWidthMode(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-champagne/50 bg-ivory/90 backdrop-blur px-3 py-1.5 text-[11px] font-body uppercase tracking-wider text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-sm"
            >
              Expanded View
            </button>
            <button
              onClick={() => setViewMode(viewMode === "3d-interactive" ? "flat" : "3d-interactive")}
              className="inline-flex items-center gap-1 rounded-full border border-champagne/50 bg-ivory/90 backdrop-blur px-2.5 py-1.5 text-[11px] font-body uppercase tracking-wider text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-sm"
            >
              {viewMode === "3d-interactive" ? "Flat View" : "3D View"}
            </button>
          </div>
        </>
      )}

      {/* Button to switch back to phone mockup if expanded */}
      {isDesktop && fullWidthMode && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setFullWidthMode(false)}
            className="inline-flex items-center gap-2 rounded-full border border-champagne bg-ivory/95 backdrop-blur px-4 py-2 text-xs font-body tracking-wider uppercase text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            Switch to Smartphone View
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3D GROUND SHADOW (Visible on desktop below floating phone)     */}
      {/* ============================================================ */}
      {showPhoneFrame && viewMode !== "flat" && (
        <div
          aria-hidden="true"
          className="phone-ground-shadow pointer-events-none absolute z-20 w-[380px] h-[90px] bottom-[2vh]"
          style={{
            transform: `translate(${rotate.y * -2.5}px, ${rotate.x * 2}px) rotateX(72deg)`,
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      )}

      {/* ============================================================ */}
      {/* PHONE MOCKUP / INVITATION CONTAINER                           */}
      {/* ============================================================ */}
      <div
        onMouseEnter={() => setIsHoveringPhone(true)}
        onMouseLeave={() => setIsHoveringPhone(false)}
        className={cn(
          "w-full preserve-3d",
          showPhoneFrame
            ? "relative z-30 flex flex-col h-[min(880px,94vh)] w-[412px] max-w-[92vw] rounded-[52px] bg-[#1a1615] p-[10px] ring-1 ring-white/20"
            : "min-h-screen",
          showPhoneFrame && viewMode !== "flat" ? "phone-3d-extrusion" : "phone-flat-shadow"
        )}
        style={{
          transform: phoneTransform,
          transition: isHoveringPhone
            ? "transform 0.15s ease-out, box-shadow 0.4s ease"
            : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease",
        }}
      >
        {/* Smartphone hardware buttons simulation on desktop */}
        {showPhoneFrame && (
          <>
            {/* Volume buttons (left side) */}
            <div className="absolute -left-[3.5px] top-[140px] w-[3.5px] h-[34px] bg-[#2b2524] rounded-l-sm shadow-sm" />
            <div className="absolute -left-[3.5px] top-[185px] w-[3.5px] h-[34px] bg-[#2b2524] rounded-l-sm shadow-sm" />
            {/* Power button (right side) */}
            <div className="absolute -right-[3.5px] top-[155px] w-[3.5px] h-[50px] bg-[#2b2524] rounded-r-sm shadow-sm" />
          </>
        )}

        {/* Dynamic Island and Status Bar on desktop */}
        {showPhoneFrame && (
          <div className="relative w-full rounded-t-[42px] bg-ivory pt-3 pb-1 px-7 flex items-center justify-between text-ink select-none z-30 border-b border-champagne/15 shrink-0">
            {/* Status bar time */}
            <span className="font-body text-xs font-semibold tracking-tight text-ink">
              {currentTime}
            </span>

            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 h-[26px] w-[108px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
              <div className="h-2.5 w-2.5 rounded-full bg-[#111] ring-1 ring-white/10 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-[#1f3a60]" />
              </div>
              <div className="h-2 w-2 rounded-full bg-[#0a1a2f]/60" />
            </div>

            {/* Status bar icons (cellular, wifi, battery) */}
            <div className="flex items-center gap-1.5 text-ink">
              {/* Signal */}
              <svg width="14" height="10" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.5" />
                <rect x="4" y="5.5" width="3" height="6.5" rx="0.5" />
                <rect x="8" y="3" width="3" height="9" rx="0.5" />
                <rect x="12" y="0.5" width="3" height="11.5" rx="0.5" />
              </svg>

              {/* Wi-Fi */}
              <svg width="13" height="11" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM3.5 6.5a6.5 6.5 0 0 1 9 0 .8.8 0 0 0 1.1-1.1 8 8 0 0 0-11.2 0 .8.8 0 0 0 1.1 1.1ZM1 3.8a10.2 10.2 0 0 1 14 0 .8.8 0 0 0 1.1-1.1 11.8 11.8 0 0 0-16.2 0 .8.8 0 1 0 1.1 1.1Z" />
              </svg>

              {/* Battery */}
              <div className="relative flex items-center">
                <div className="h-3 w-5 rounded-[3px] border border-ink p-[1px] flex items-center">
                  <div className="h-full w-full rounded-[1.5px] bg-ink" />
                </div>
                <div className="h-1.5 w-[1.5px] rounded-r-sm bg-ink" />
              </div>
            </div>
          </div>
        )}

        {/* Screen Content Wrapper with 3D Glass Sheen reflection */}
        <div
          ref={containerRef}
          className={cn(
            "w-full bg-ivory relative",
            showPhoneFrame
              ? "flex-1 overflow-y-auto no-scrollbar scroll-smooth rounded-b-[42px]"
              : "min-h-screen"
          )}
        >
          {/* Moving 3D Specular Glare across phone glass */}
          {showPhoneFrame && viewMode !== "flat" && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-40 rounded-b-[42px] transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 68%)`,
              }}
            />
          )}

          {children({
            isInsidePhone: showPhoneFrame,
            containerRef,
          })}
        </div>

        {/* iPhone Bottom Home Indicator Bar on desktop */}
        {showPhoneFrame && (
          <div className="relative w-full bg-ivory rounded-b-[42px] pt-1.5 pb-2.5 flex justify-center z-30 shrink-0 pointer-events-none">
            <div className="h-1 w-32 rounded-full bg-ink/30" />
          </div>
        )}
      </div>
    </div>
  );
}
