"use client";

import { useCallback, useEffect, useState } from "react";

type XY = { x: number; y: number };

const PARALLAX_STRENGTH = 24;
const SMOOTHING = 0.08;

export default function CursorParallaxBackground() {
  const [mouse, setMouse] = useState<XY>({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState<XY>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x, y });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    const x = (t.clientX / window.innerWidth) * 2 - 1;
    const y = (t.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMouseMove, handleTouchMove, handleLeave]);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setSmooth((prev) => ({
        x: prev.x + (mouse.x - prev.x) * SMOOTHING,
        y: prev.y + (mouse.y - prev.y) * SMOOTHING,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouse.x, mouse.y]);

  const move = (factor: number) => ({
    x: smooth.x * PARALLAX_STRENGTH * factor,
    y: smooth.y * PARALLAX_STRENGTH * factor,
  });

  /** 3D rotation influenced by cursor for depth */
  const rotate3D = (factor: number) => ({
    rotateX: smooth.y * 8 * factor,
    rotateY: smooth.x * 8 * factor,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.12),transparent_50%)]"
        style={{ backgroundColor: "var(--background, #0B0C10)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/98 via-slate-950/95 to-slate-950" />

      {/* Parallax orbs */}
      <div
        className="absolute -left-[20%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-cyan-500/15 blur-3xl transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${move(1.2).x}px, ${move(1.2).y}px)`,
        }}
      />
      <div
        className="absolute -right-[15%] top-[40%] h-[45vmax] w-[45vmax] rounded-full bg-violet-500/12 blur-3xl transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${-move(0.9).x}px, ${move(0.9).y}px)`,
        }}
      />
      <div
        className="absolute bottom-[5%] left-[30%] h-[40vmax] w-[40vmax] rounded-full bg-teal-500/10 blur-3xl transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${move(0.7).x}px, ${-move(0.7).y}px)`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-3xl transition-transform duration-150 ease-out"
        style={{
          transform: `translate(calc(-50% + ${move(0.4).x}px), calc(-50% + ${move(0.4).y}px))`,
        }}
      />

      {/* ----- 3D floating elements (cursor-reactive) ----- */}
      <div className="absolute inset-0" style={{ perspective: "1200px" }}>
        {/* Tilted diamond / square - top left */}
        <div
          className="absolute left-[12%] top-[18%] h-24 w-24 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${move(1.4).x}px, ${move(1.4).y}px) rotateX(${rotate3D(0.6).rotateX}deg) rotateY(${rotate3D(0.6).rotateY}deg) rotateZ(45deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full rounded-2xl border border-cyan-400/25 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* Floating card - right side */}
        <div
          className="absolute right-[15%] top-[28%] h-20 w-32 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${-move(1.1).x}px, ${move(1.1).y}px) rotateX(${rotate3D(0.5).rotateX}deg) rotateY(${rotate3D(0.5).rotateY}deg) rotateZ(-12deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full rounded-xl border border-violet-400/20 bg-violet-500/10 shadow-[0_0_24px_rgba(139,92,246,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* Hexagon ring - center-right */}
        <div
          className="absolute right-[22%] bottom-[32%] transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${-move(0.9).x}px, ${-move(0.9).y}px) rotateX(${rotate3D(0.4).rotateX}deg) rotateY(${rotate3D(0.4).rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="opacity-40"
            style={{ filter: "drop-shadow(0 0 12px rgba(20,184,166,0.2))" }}
          >
            <polygon
              points="40,8 68,26 68,54 40,72 12,54 12,26"
              fill="none"
              stroke="rgba(20,184,166,0.35)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Small cube face - bottom left */}
        <div
          className="absolute bottom-[22%] left-[18%] h-16 w-16 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${move(1.3).x}px, ${-move(1.3).y}px) rotateX(${rotate3D(0.7).rotateX}deg) rotateY(${rotate3D(0.7).rotateY}deg) rotateZ(15deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full rounded-lg border border-teal-400/20 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* Circle ring - top right */}
        <div
          className="absolute right-[28%] top-[22%] h-14 w-14 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${-move(1).x}px, ${move(1).y}px) rotateX(${rotate3D(0.45).rotateX}deg) rotateY(${rotate3D(0.45).rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full rounded-full border border-cyan-400/20 bg-transparent shadow-[0_0_16px_rgba(6,182,212,0.1)]"
            style={{ transform: "translateZ(0)", boxShadow: "inset 0 0 0 1px rgba(6,182,212,0.15)" }}
          />
        </div>

        {/* Large tilted plane - center-left */}
        <div
          className="absolute left-[8%] top-1/2 h-28 w-36 -translate-y-1/2 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${move(0.8).x}px, ${move(0.8).y}px) rotateX(${rotate3D(0.35).rotateX}deg) rotateY(${rotate3D(0.35).rotateY}deg) rotateZ(-8deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full rounded-2xl border border-cyan-400/15 bg-cyan-500/5 shadow-[0_0_40px_rgba(6,182,212,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* Small diamond - bottom right */}
        <div
          className="absolute bottom-[30%] right-[12%] h-12 w-12 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${-move(1.2).x}px, ${-move(1.2).y}px) rotateX(${rotate3D(0.55).rotateX}deg) rotateY(${rotate3D(0.55).rotateY}deg) rotateZ(45deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full rounded-lg border border-violet-400/20 bg-violet-500/8 shadow-[0_0_16px_rgba(139,92,246,0.1)]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>
      </div>

      {/* Subtle grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] transition-transform duration-150 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: `translate(${move(0.2).x}px, ${move(0.2).y}px)`,
        }}
      />
    </div>
  );
}
