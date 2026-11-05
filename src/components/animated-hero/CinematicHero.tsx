"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SunsetEnvironment from "./SunsetEnvironment";
import VintageCar from "./VintageCar";
import Bouquet from "./Bouquet";
import { PetalCanvas, type PetalCanvasRef } from "./PetalCanvas";
import WeddingTitleOverlay from "./WeddingTitleOverlay";
import { cn } from "@/lib/utils";

interface CinematicHeroProps {
  onOpenInvitation: () => void;
  onSkip?: () => void;
  isInsidePhone?: boolean;
  className?: string;
}

export default function CinematicHero({
  onOpenInvitation,
  onSkip,
  isInsidePhone = false,
  className,
}: CinematicHeroProps) {
  const petalCanvasRef = useRef<PetalCanvasRef | null>(null);

  // Animation timeline states
  const [carEntered, setCarEntered] = useState(false);
  const [carStopped, setCarStopped] = useState(false);
  const [bouquetThrown, setBouquetThrown] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  // Run cinematic timeline sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const tReduced = setTimeout(() => {
        setCarEntered(true);
        setCarStopped(true);
        setTitleVisible(true);
      }, 0);
      return () => clearTimeout(tReduced);
    }

    // Step 1: Car starts entering
    const tCarEnter = setTimeout(() => {
      setCarEntered(true);
    }, 400);

    // Step 2: Car reaches center and settles
    const tCarStop = setTimeout(() => {
      setCarStopped(true);
    }, 2400);

    // Step 3: Bride throws bouquet
    const tBouquet = setTimeout(() => {
      setBouquetThrown(true);
    }, 3200);

    // Step 4 & 5: Title overlay appears after petal burst
    const tTitle = setTimeout(() => {
      setTitleVisible(true);
    }, 4500);

    return () => {
      clearTimeout(tCarEnter);
      clearTimeout(tCarStop);
      clearTimeout(tBouquet);
      clearTimeout(tTitle);
    };
  }, []);

  // Bouquet apex callback triggers petal explosion
  const handleBouquetApex = useCallback(() => {
    petalCanvasRef.current?.triggerBurst();
  }, []);

  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("wedding:open"));
    onOpenInvitation();
  };

  const handleSkip = () => {
    window.dispatchEvent(new CustomEvent("wedding:open"));
    if (onSkip) {
      onSkip();
    } else {
      onOpenInvitation();
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden select-none bg-[#241530]",
        isInsidePhone ? "min-h-[700px] h-full" : "min-h-screen",
        className
      )}
    >
      {/* Scene 1: Sunset Environment */}
      <SunsetEnvironment />

      {/* Scene 4: Flower Petal Particle System */}
      <PetalCanvas ref={petalCanvasRef} />

      {/* Scene 2 & 3: Car Arrival & Bouquet Throw */}
      <div className="absolute bottom-[8%] sm:bottom-[10%] inset-x-0 z-20 flex justify-center pointer-events-none">
        <VintageCar isEntering={carEntered} isStopped={carStopped}>
          {/* Position Bouquet right near the bride's right hand */}
          <div className="absolute right-[46px] sm:right-[70px] top-[72px] sm:top-[105px]">
            <Bouquet isThrowing={bouquetThrown} onApex={handleBouquetApex} />
          </div>
        </VintageCar>
      </div>

      {/* Scene 5 & 6: Wedding Title Overlay & Open Invitation Button */}
      <WeddingTitleOverlay
        isVisible={titleVisible}
        onOpen={handleOpen}
        onSkip={handleSkip}
      />
    </div>
  );
}
