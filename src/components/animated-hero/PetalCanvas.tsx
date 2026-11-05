"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";

export interface PetalCanvasRef {
  triggerBurst: (x?: number, y?: number) => void;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  flipAngle: number;
  flipSpeed: number;
  color: string;
  opacity: number;
  isBurst: boolean;
  life?: number;
  maxLife?: number;
}

const PETAL_COLORS = [
  "rgba(255, 255, 255, 0.92)",
  "rgba(253, 247, 237, 0.9)",
  "rgba(247, 228, 222, 0.88)",
  "rgba(250, 235, 215, 0.85)",
  "rgba(255, 240, 245, 0.9)",
  "rgba(235, 215, 195, 0.8)",
];

export const PetalCanvas = forwardRef<PetalCanvasRef, { className?: string }>(
  ({ className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const petalsRef = useRef<Petal[]>([]);
    const animIdRef = useRef<number | null>(null);

    const spawnAmbientPetal = useCallback((width: number): Petal => {
      return {
        x: Math.random() * (width + 100) - 50,
        y: -20 - Math.random() * 40,
        vx: (Math.random() - 0.2) * 1.5,
        vy: 1.2 + Math.random() * 1.8,
        size: 7 + Math.random() * 12,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: 0.02 + Math.random() * 0.03,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        opacity: 0.5 + Math.random() * 0.45,
        isBurst: false,
      };
    }, []);

    const triggerBurst = useCallback((origX?: number, origY?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      const targetX = origX ?? width * 0.52;
      const targetY = origY ?? height * 0.38;

      const burstCount = window.innerWidth < 640 ? 55 : 95;
      const newPetals: Petal[] = [];

      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 7.5;
        const maxLife = 180 + Math.random() * 120;

        newPetals.push({
          x: targetX + (Math.random() - 0.5) * 20,
          y: targetY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed - 2.5 - Math.random() * 3, // Initial upward burst
          size: 8 + Math.random() * 14,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.08,
          flipAngle: Math.random() * Math.PI * 2,
          flipSpeed: 0.04 + Math.random() * 0.06,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
          opacity: 0.95,
          isBurst: true,
          life: maxLife,
          maxLife: maxLife,
        });
      }

      petalsRef.current.push(...newPetals);
    }, []);

    useImperativeHandle(ref, () => ({
      triggerBurst,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const handleResize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      // Prepopulate ambient petals
      const rect = canvas.getBoundingClientRect();
      const initialAmbientCount = prefersReducedMotion ? 10 : window.innerWidth < 640 ? 25 : 45;
      petalsRef.current = [];
      for (let i = 0; i < initialAmbientCount; i++) {
        const p = spawnAmbientPetal(rect.width);
        p.y = Math.random() * rect.height; // scatter across screen
        petalsRef.current.push(p);
      }

      // Draw single organic petal shape
      const drawPetal = (p: Petal) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const scaleY = Math.cos(p.flipAngle);
        ctx.scale(1, scaleY);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.7, -s * 0.8, s * 0.9, s * 0.2, 0, s);
        ctx.bezierCurveTo(-s * 0.9, s * 0.2, -s * 0.7, -s * 0.8, 0, -s);
        ctx.closePath();
        ctx.fill();

        // Delicate inner vein highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.7);
        ctx.lineTo(0, s * 0.6);
        ctx.stroke();

        ctx.restore();
      };

      let lastTime = performance.now();

      const animate = (time: number) => {
        const dt = Math.min((time - lastTime) / 16.667, 2);
        lastTime = time;

        const w = canvas.width / (window.devicePixelRatio || 1);
        const h = canvas.height / (window.devicePixelRatio || 1);

        ctx.clearRect(0, 0, w, h);

        const currentPetals = petalsRef.current;
        const nextPetals: Petal[] = [];

        for (let i = 0; i < currentPetals.length; i++) {
          const p = currentPetals[i];

          if (p.isBurst) {
            // Apply air drag and gravity
            p.vx *= 0.97;
            p.vy = p.vy * 0.96 + 0.12 * dt; // gravity brings it down
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rotation += p.vRot * dt;
            p.flipAngle += p.flipSpeed * dt;

            if (p.life !== undefined && p.maxLife !== undefined) {
              p.life -= dt;
              if (p.life < 40) {
                p.opacity = (p.life / 40) * 0.9;
              }
              if (p.life > 0 && p.y < h + 40 && p.x > -50 && p.x < w + 50) {
                drawPetal(p);
                nextPetals.push(p);
              }
            }
          } else {
            // Ambient gentle drifting petal
            p.x += (p.vx + Math.sin(p.y * 0.015 + time * 0.001) * 0.8) * dt;
            p.y += p.vy * dt;
            p.rotation += p.vRot * dt;
            p.flipAngle += p.flipSpeed * dt;

            if (p.y > h + 30) {
              // recycle to top
              if (nextPetals.length < 50) {
                nextPetals.push(spawnAmbientPetal(w));
              }
            } else {
              drawPetal(p);
              nextPetals.push(p);
            }
          }
        }

        petalsRef.current = nextPetals;
        animIdRef.current = requestAnimationFrame(animate);
      };

      animIdRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animIdRef.current) {
          cancelAnimationFrame(animIdRef.current);
        }
      };
    }, [spawnAmbientPetal]);

    return (
      <canvas
        ref={canvasRef}
        className={className || "pointer-events-none absolute inset-0 z-30 h-full w-full"}
      />
    );
  }
);

PetalCanvas.displayName = "PetalCanvas";
