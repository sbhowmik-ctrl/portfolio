"use client";

import { useCallback, useEffect, useState } from "react";

type XY = { x: number; y: number };

const PARALLAX = 28;
const SMOOTHING = 0.08;
const ROTATE_STRENGTH = 10;

export default function ContactPage3DBackground() {
  const [mouse, setMouse] = useState<XY>({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState<XY>({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    setMouse({
      x: (t.clientX / window.innerWidth) * 2 - 1,
      y: (t.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  const onLeave = useCallback(() => setMouse({ x: 0, y: 0 }), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [onMouseMove, onTouchMove, onLeave]);

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
    x: smooth.x * PARALLAX * factor,
    y: smooth.y * PARALLAX * factor,
  });

  const rotate = (factor: number) => ({
    x: smooth.y * ROTATE_STRENGTH * factor,
    y: smooth.x * ROTATE_STRENGTH * factor,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D shapes - contact page only */}
      <div
        className="absolute left-[8%] top-[20%] h-28 w-28 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${move(1.5).x}px, ${move(1.5).y}px) rotateX(${rotate(0.7).x}deg) rotateY(${rotate(0.7).y}deg) rotateZ(45deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/15 shadow-[0_0_40px_rgba(6,182,212,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div
        className="absolute right-[10%] top-[25%] h-20 w-32 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${-move(1.2).x}px, ${move(1.2).y}px) rotateX(${rotate(0.5).x}deg) rotateY(${rotate(0.5).y}deg) rotateZ(-15deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-xl border border-violet-400/25 bg-violet-500/12 shadow-[0_0_30px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div
        className="absolute right-[20%] bottom-[25%] transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${-move(1).x}px, ${-move(1).y}px) rotateX(${rotate(0.45).x}deg) rotateY(${rotate(0.45).y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 80 80"
          className="opacity-50"
          style={{ filter: "drop-shadow(0 0 14px rgba(20,184,166,0.25))" }}
        >
          <polygon
            points="40,8 68,26 68,54 40,72 12,54 12,26"
            fill="none"
            stroke="rgba(20,184,166,0.4)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-[20%] left-[15%] h-20 w-20 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${move(1.4).x}px, ${-move(1.4).y}px) rotateX(${rotate(0.6).x}deg) rotateY(${rotate(0.6).y}deg) rotateZ(20deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-xl border border-teal-400/25 bg-teal-500/12 shadow-[0_0_28px_rgba(20,184,166,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div
        className="absolute right-[25%] top-[18%] h-16 w-16 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${-move(1.1).x}px, ${move(1.1).y}px) rotateX(${rotate(0.5).x}deg) rotateY(${rotate(0.5).y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-full border-2 border-cyan-400/25 bg-transparent shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          style={{ transform: "translateZ(0)", boxShadow: "inset 0 0 0 1px rgba(6,182,212,0.2)" }}
        />
      </div>

      <div
        className="absolute left-[5%] top-1/2 h-24 w-32 -translate-y-1/2 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${move(0.9).x}px, ${move(0.9).y}px) rotateX(${rotate(0.4).x}deg) rotateY(${rotate(0.4).y}deg) rotateZ(-10deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/8 shadow-[0_0_35px_rgba(6,182,212,0.12),inset_0_1px_0_rgba(255,255,255,0.05)]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div
        className="absolute bottom-[28%] right-[8%] h-14 w-14 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${-move(1.3).x}px, ${-move(1.3).y}px) rotateX(${rotate(0.55).x}deg) rotateY(${rotate(0.55).y}deg) rotateZ(45deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-lg border border-violet-400/25 bg-violet-500/10 shadow-[0_0_18px_rgba(139,92,246,0.12)]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      {/* Extra ring near form area */}
      <div
        className="absolute left-1/2 top-[55%] h-20 w-20 -translate-x-1/2 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(calc(-50% + ${move(0.6).x}px), ${move(0.6).y}px) rotateX(${rotate(0.35).x}deg) rotateY(${rotate(0.35).y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full rounded-full border border-teal-400/20 bg-transparent"
          style={{ transform: "translateZ(0)", boxShadow: "0 0 24px rgba(20,184,166,0.1), inset 0 0 0 1px rgba(20,184,166,0.15)" }}
        />
      </div>
    </div>
  );
}
