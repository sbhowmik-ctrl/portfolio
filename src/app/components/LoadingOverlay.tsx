"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "loading-overlay-shown";
const DISPLAY_MS = 1200; // Show for 1.2s then always hide

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"visible" | "exiting" | "gone">("visible");
  const initialPathname = useRef<string | null>(null);

  // On internal navigation, hide immediately
  useEffect(() => {
    if (initialPathname.current === null) {
      initialPathname.current = pathname;
    } else if (pathname !== initialPathname.current) {
      if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("gone");
    }
  }, [pathname]);

  // Single timer: hide after DISPLAY_MS so we never get stuck
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

  // After "exiting", go to "gone" (with or without transition)
  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => setPhase("gone"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName === "opacity" && phase === "exiting") setPhase("gone");
  };

  if (phase === "gone") return null;

  return (
    <div
      className={`loading-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 ${
        phase === "exiting" ? "loading-overlay--exiting" : ""
      }`}
      aria-hidden={phase === "exiting"}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        <p className="text-sm text-slate-300">Loading experience…</p>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <span className="loading-dot h-2 w-2 rounded-full bg-cyan-400" style={{ animationDelay: "0ms" }} />
        <span className="loading-dot h-2 w-2 rounded-full bg-cyan-400" style={{ animationDelay: "150ms" }} />
        <span className="loading-dot h-2 w-2 rounded-full bg-cyan-400" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
