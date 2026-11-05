"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface VintageCarProps {
  isEntering: boolean;
  isStopped: boolean;
  className?: string;
  children?: React.ReactNode; // for positioning the Bouquet relative to the couple
}

export default function VintageCar({
  isEntering,
  isStopped,
  className,
  children,
}: VintageCarProps) {
  return (
    <div
      className={cn(
        "relative transition-transform duration-[2200ms] ease-out will-change-transform select-none",
        isEntering ? "translate-x-0" : "-translate-x-[120vw]",
        className
      )}
    >
      {/* Car chassis micro-suspension bounce when stopped */}
      <div
        className={cn(
          "relative flex flex-col items-center",
          isStopped && "animate-[chassis-idle_3.5s_ease-in-out_infinite]"
        )}
      >
        {/* ============================================================ */}
        {/* LAYER 1: COUPLE ILLUSTRATION (Positioned inside convertible)  */}
        {/* ============================================================ */}
        <div className="relative -mb-[120px] sm:-mb-[165px] z-10 w-[240px] sm:w-[330px] flex justify-center">
          <div className="relative w-full aspect-[1024/935]">
            <Image
              src="/wedding/hero/couple.png"
              alt="Engaged Couple"
              fill
              priority
              sizes="(max-width: 640px) 240px, 330px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(30,20,15,0.45)]"
            />
          </div>

          {/* Children slot: used for placing the Bouquet near bride's hands */}
          {children}
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: VINTAGE IVORY CONVERTIBLE CAR (SVG)                 */}
        {/* ============================================================ */}
        <div className="relative z-20 w-[350px] sm:w-[500px]">
          <svg
            viewBox="0 0 540 220"
            fill="none"
            className="w-full h-auto drop-shadow-[0_25px_35px_rgba(25,16,12,0.65)]"
          >
            <defs>
              {/* Ivory Paint Gradient */}
              <linearGradient id="ivoryCarBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffaee" />
                <stop offset="35%" stopColor="#f7f0e0" />
                <stop offset="70%" stopColor="#ece2ce" />
                <stop offset="100%" stopColor="#d8ccb6" />
              </linearGradient>

              {/* Polished Chrome Gradients */}
              <linearGradient id="chromeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#d6e0ea" />
                <stop offset="50%" stopColor="#9fb0c0" />
                <stop offset="75%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#7a8b9a" />
              </linearGradient>

              {/* Burgundy Leather Interior */}
              <linearGradient id="leatherInterior" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#642c2c" />
                <stop offset="100%" stopColor="#3d1818" />
              </linearGradient>

              {/* Headlamp Sunset Glow */}
              <radialGradient id="lampGlow" cx="20%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#fff8db" />
                <stop offset="60%" stopColor="#f5cf72" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e89838" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Rear Cockpit / Leather Backrests */}
            <path
              d="M140 85 C140 70 170 65 185 85 L230 85 C240 65 270 70 270 85 Z"
              fill="url(#leatherInterior)"
            />

            {/* Vintage Chrome Windshield Frame */}
            <path
              d="M275 85 L320 35 L370 35 L385 85 Z"
              fill="rgba(255, 255, 255, 0.25)"
              stroke="url(#chromeGradient)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Windshield Glass Reflection Lines */}
            <line x1="330" y1="42" x2="310" y2="82" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
            <line x1="350" y1="42" x2="330" y2="82" stroke="white" strokeWidth="1.2" strokeOpacity="0.4" />

            {/* Convertible Cockpit Opening & Door Cutout */}
            <path
              d="M120 90 Q240 92 390 88 L390 120 L120 120 Z"
              fill="#2b1a16"
            />

            {/* ======================================================== */}
            {/* MAIN VINTAGE CAR CHASSIS                                 */}
            {/* ======================================================== */}
            <path
              d="M40 125 
                 C50 105 110 95 150 92 
                 L380 90 
                 C440 92 480 105 520 125 
                 C535 132 538 145 530 155 
                 L515 160 
                 C500 160 480 135 440 135 
                 C400 135 380 160 365 160 
                 L215 160 
                 C200 160 180 135 140 135 
                 C100 135 80 160 65 160 
                 L25 158 
                 C12 150 15 135 40 125 Z"
              fill="url(#ivoryCarBody)"
              stroke="#bba88e"
              strokeWidth="1.5"
            />

            {/* Lower Rocker Panel Shadow */}
            <path
              d="M65 158 L140 135 C180 135 200 160 215 160 L365 160 C380 160 400 135 440 135 L515 160 L510 168 L30 166 Z"
              fill="#1e1814"
              opacity="0.6"
            />

            {/* Sleek Chrome Side Trim Spear */}
            <path
              d="M35 132 C120 126 380 122 515 136"
              stroke="url(#chromeGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Vintage Door Outline & Chrome Handle */}
            <path d="M210 92 L205 155 M340 91 L335 155" stroke="#c4b29a" strokeWidth="1.2" />
            <rect x="235" y="105" width="22" height="4" rx="2" fill="url(#chromeGradient)" />

            {/* Classic Round Headlamp (Front) */}
            <circle cx="510" cy="122" r="14" fill="url(#chromeGradient)" />
            <circle cx="510" cy="122" r="11" fill="url(#lampGlow)" />
            {/* Front Headlight Light Beam */}
            <path
              d="M522 122 L620 100 L620 155 Z"
              fill="url(#lampGlow)"
              opacity="0.45"
            />

            {/* Vintage Chrome Front Bumper */}
            <path
              d="M495 152 C525 150 538 140 538 132 L532 130 C532 142 515 146 490 148 Z"
              fill="url(#chromeGradient)"
            />

            {/* Vintage Chrome Rear Bumper */}
            <path
              d="M45 152 C15 150 2 140 2 132 L8 130 C8 142 25 146 50 148 Z"
              fill="url(#chromeGradient)"
            />

            {/* Rear Tail Lamp (Ruby Red) */}
            <rect x="18" y="124" width="8" height="12" rx="3" fill="#991b1b" stroke="url(#chromeGradient)" strokeWidth="1" />

            {/* Just Married / Monogram Gold License Plate */}
            <rect x="235" y="152" width="70" height="16" rx="2" fill="#fff9ef" stroke="#b49a62" strokeWidth="1.2" />
            <text x="270" y="163" fill="#642c2c" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1em">
              JUST MARRIED
            </text>

            {/* ======================================================== */}
            {/* WHITEWALL WHEELS (With realistic spin animation)         */}
            {/* ======================================================== */}
            {/* Rear Wheel */}
            <g transform="translate(102, 155)" className={cn(!isStopped && "animate-[wheel-spin_1.2s_linear_infinite]")}>
              <circle cx="0" cy="0" r="32" fill="#151210" />
              <circle cx="0" cy="0" r="24" fill="#f8f4ea" stroke="#d5c8b5" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="15" fill="url(#chromeGradient)" />
              <circle cx="0" cy="0" r="5" fill="#444" />
              {/* Wire spokes */}
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#777" strokeWidth="1" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#777" strokeWidth="1" />
              <line x1="-10" y1="-10" x2="10" y2="10" stroke="#777" strokeWidth="1" />
              <line x1="-10" y1="10" x2="10" y2="-10" stroke="#777" strokeWidth="1" />
            </g>

            {/* Front Wheel */}
            <g transform="translate(438, 155)" className={cn(!isStopped && "animate-[wheel-spin_1.2s_linear_infinite]")}>
              <circle cx="0" cy="0" r="32" fill="#151210" />
              <circle cx="0" cy="0" r="24" fill="#f8f4ea" stroke="#d5c8b5" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="15" fill="url(#chromeGradient)" />
              <circle cx="0" cy="0" r="5" fill="#444" />
              {/* Wire spokes */}
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#777" strokeWidth="1" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#777" strokeWidth="1" />
              <line x1="-10" y1="-10" x2="10" y2="10" stroke="#777" strokeWidth="1" />
              <line x1="-10" y1="10" x2="10" y2="-10" stroke="#777" strokeWidth="1" />
            </g>

            {/* ======================================================== */}
            {/* WEDDING FLORAL GARLAND (Draped gracefully along side)    */}
            {/* ======================================================== */}
            <g opacity="0.95">
              {/* Foliage Swag Curve */}
              <path
                d="M140 102 Q260 114 380 98"
                stroke="#3f5a34"
                strokeWidth="4"
                fill="none"
              />
              {/* White Roses along garland */}
              <circle cx="150" cy="103" r="5" fill="#ffffff" stroke="#e0cfbb" strokeWidth="0.8" />
              <circle cx="185" cy="106" r="6" fill="#fffbf4" stroke="#e0cfbb" strokeWidth="0.8" />
              <circle cx="225" cy="108" r="5.5" fill="#ffffff" stroke="#e0cfbb" strokeWidth="0.8" />
              <circle cx="265" cy="109" r="6.5" fill="#fdf7ee" stroke="#e0cfbb" strokeWidth="0.8" />
              <circle cx="305" cy="107" r="5.5" fill="#ffffff" stroke="#e0cfbb" strokeWidth="0.8" />
              <circle cx="345" cy="103" r="6" fill="#fffbf4" stroke="#e0cfbb" strokeWidth="0.8" />
              <circle cx="375" cy="99" r="5" fill="#ffffff" stroke="#e0cfbb" strokeWidth="0.8" />
              {/* Trailing Silk Ribbons */}
              <path d="M145 106 Q140 120 148 132" stroke="#b49a62" strokeWidth="1.5" fill="none" />
              <path d="M375 102 Q382 118 376 130" stroke="#b49a62" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
