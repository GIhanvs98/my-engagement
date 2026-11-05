"use client";

import { cn } from "@/lib/utils";

interface SunsetEnvironmentProps {
  className?: string;
}

export default function SunsetEnvironment({ className }: SunsetEnvironmentProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#241530] via-[#7d3759] via-50% via-[#c95b54] via-72% via-[#e68d4d] via-86% to-[#fdd27e]" />

      {/* 2. Atmospheric Sunset Glow & Radiant Sun */}
      <div className="absolute left-1/2 top-[34%] sm:top-[32%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        {/* Giant outer atmospheric halo */}
        <div className="h-[440px] w-[440px] sm:h-[580px] sm:w-[580px] rounded-full bg-gradient-to-r from-[#ffd375]/25 via-[#ff955c]/20 to-transparent blur-3xl animate-pulse" />
        {/* Soft mid halo */}
        <div className="absolute h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[#ffe49e]/35 blur-2xl" />
        {/* Radiant Sun Disk */}
        <div className="absolute h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-b from-[#fffef0] to-[#ffd479] shadow-[0_0_80px_35px_rgba(255,215,120,0.6)]" />
      </div>

      {/* 3. Floating Animated Sunset Clouds */}
      <div className="absolute inset-x-0 top-[10%] h-48 overflow-hidden pointer-events-none opacity-70">
        {/* Cloud 1 (Slow high altitude) */}
        <div className="absolute top-4 left-[-15%] w-[420px] h-20 rounded-full bg-gradient-to-r from-transparent via-[#ffd0b5]/25 to-transparent blur-xl animate-[cloud-drift_45s_linear_infinite]" />
        {/* Cloud 2 (Warm sunset pink) */}
        <div className="absolute top-14 left-[20%] w-[540px] h-24 rounded-full bg-gradient-to-r from-transparent via-[#fca699]/30 to-transparent blur-2xl animate-[cloud-drift_60s_linear_infinite_reverse]" />
        {/* Cloud 3 (Golden lower cloud) */}
        <div className="absolute top-28 left-[45%] w-[380px] h-16 rounded-full bg-gradient-to-r from-transparent via-[#ffdca8]/35 to-transparent blur-lg animate-[cloud-drift_35s_linear_infinite]" />
      </div>

      {/* 4. Layered Distant Mountains & Green Hills (SVG) */}
      <svg
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
        className="absolute bottom-0 inset-x-0 w-full h-[62%] sm:h-[58%] object-cover"
      >
        <defs>
          <linearGradient id="farMountains" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#552f4e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#301931" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="midMountains" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a424e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2c222a" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="countrysideHills" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#435e38" />
            <stop offset="55%" stopColor="#2c3f25" />
            <stop offset="100%" stopColor="#1a2517" />
          </linearGradient>

          <linearGradient id="foregroundRoad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3c312a" />
            <stop offset="100%" stopColor="#1f1814" />
          </linearGradient>
        </defs>

        {/* Far Mountain Peaks */}
        <path
          d="M0 240 L120 180 L280 260 L440 160 L620 270 L780 170 L960 250 L1140 150 L1300 240 L1440 190 L1440 600 L0 600 Z"
          fill="url(#farMountains)"
        />

        {/* Mid Mountain Ridges */}
        <path
          d="M0 280 Q180 210 360 270 T720 250 T1080 240 T1440 280 L1440 600 L0 600 Z"
          fill="url(#midMountains)"
          opacity="0.85"
        />

        {/* Lush Countryside Green Hills */}
        <path
          d="M0 340 C220 290 400 370 640 330 C880 290 1100 350 1440 310 L1440 600 L0 600 Z"
          fill="url(#countrysideHills)"
        />

        {/* Countryside Silhouetted Cypress Trees & Wildflowers on Horizon */}
        <g fill="#1a2717" opacity="0.9">
          {/* Group 1 */}
          <path d="M110 320 C108 300 112 300 110 275 C108 300 112 300 110 320 Z" stroke="#1a2717" strokeWidth="4" />
          <path d="M125 325 C123 305 127 305 125 285 C123 305 127 305 125 325 Z" stroke="#1a2717" strokeWidth="3.5" />
          {/* Group 2 */}
          <path d="M480 340 C478 320 482 320 480 290 C478 320 482 320 480 340 Z" stroke="#1a2717" strokeWidth="5" />
          <path d="M495 345 C493 325 497 325 495 300 C493 325 497 325 495 345 Z" stroke="#1a2717" strokeWidth="4" />
          {/* Group 3 */}
          <path d="M980 325 C978 305 982 305 980 285 C978 305 982 305 980 325 Z" stroke="#1a2717" strokeWidth="4" />
          <path d="M1000 330 C998 310 1002 310 1000 295 C998 310 1002 310 1000 330 Z" stroke="#1a2717" strokeWidth="3.5" />
        </g>

        {/* Countryside Foreground Meadow & Road */}
        <path
          d="M0 420 Q360 380 720 420 T1440 400 L1440 600 L0 600 Z"
          fill="#253520"
        />

        {/* Scenic Winding Countryside Road */}
        <path
          d="M0 470 C420 450 780 470 1440 450 L1440 600 L0 600 Z"
          fill="url(#foregroundRoad)"
        />

        {/* Warm Golden Road Rim Highlight */}
        <path
          d="M0 470 C420 450 780 470 1440 450"
          stroke="#f6bf75"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          fill="none"
        />
      </svg>

      {/* 5. Golden Atmospheric Dust Sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,215,120,0.18),transparent_70%)] pointer-events-none" />
    </div>
  );
}
