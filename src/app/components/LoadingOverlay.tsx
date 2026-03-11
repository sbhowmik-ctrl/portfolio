"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "loading-overlay-shown";
const DISPLAY_MS = 1200;

const FUN_MESSAGES = [
  "Preparing your experience…",
  "Assembling the bits…",
  "Almost there…",
  "Loading awesome…",
  "Spinning up…",
];

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"visible" | "exiting" | "gone">("visible");
  const [messageIndex, setMessageIndex] = useState(0);
  const initialPathname = useRef<string | null>(null);

  useEffect(() => {
    if (initialPathname.current === null) {
      initialPathname.current = pathname;
    } else if (pathname !== initialPathname.current) {
      if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("gone");
    }
  }, [pathname]);

  useEffect(() => {
    if (phase !== "visible") return;
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) {
      setPhase("gone");
      return;
    }
    const t = setTimeout(() => {
      if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("exiting");
    }, DISPLAY_MS);
    return () => clearTimeout(t);
  }, [pathname, phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => setPhase("gone"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // Cycle through fun messages while loading
  useEffect(() => {
    if (phase !== "visible") return;
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % FUN_MESSAGES.length);
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName === "opacity" && phase === "exiting") setPhase("gone");
  };

  if (phase === "gone") return null;

  return (
    <div
      className={`loading-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-slate-950 ${
        phase === "exiting" ? "loading-overlay--exiting" : ""
      }`}
      aria-hidden={phase === "exiting"}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* 3D cube container with perspective */}
      <div className="loading-cube-scene" aria-hidden>
        <div className="loading-cube">
          <div className="loading-cube-face loading-cube-face--front" />
          <div className="loading-cube-face loading-cube-face--back" />
          <div className="loading-cube-face loading-cube-face--right" />
          <div className="loading-cube-face loading-cube-face--left" />
          <div className="loading-cube-face loading-cube-face--top" />
          <div className="loading-cube-face loading-cube-face--bottom" />
        </div>
      </div>

      <p className="loading-message text-sm font-medium text-slate-300 tabular-nums">
        {FUN_MESSAGES[messageIndex]}
      </p>

      {/* Orbiting dots for extra fun */}
      <div className="loading-orbits" aria-hidden>
        <div className="loading-orbit loading-orbit--1">
          <span className="loading-orb-dot" />
        </div>
        <div className="loading-orbit loading-orbit--2">
          <span className="loading-orb-dot" />
        </div>
        <div className="loading-orbit loading-orbit--3">
          <span className="loading-orb-dot" />
        </div>
      </div>
    </div>
  );
}
