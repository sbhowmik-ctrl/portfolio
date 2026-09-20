"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HI = "HI,";
const THERE = "THERE";
const TOTAL = HI.length + THERE.length;
const STEP = 0.09;
const TRAITS = ["Creative", "Reliable", "Strategist", "Builder", "Efficient"];
const TAPE = [
  "Python",
  "Next.js",
  "RAG",
  "LLMs",
  "AWS",
  "Docker",
  "GCP",
  "PostgreSQL",
  "CI/CD",
  "Azure",
];

function TypedLine({
  text,
  className,
  start,
  onComplete,
}: {
  text: string;
  className: string;
  start: number;
  onComplete?: () => void;
}) {
  return (
    <span className={`block ${className}`}>
      {text.split("").map((ch, i) => {
        const index = start + i;
        return (
          <motion.span
            key={`${text}-${i}`}
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * STEP,
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={index === TOTAL - 1 ? onComplete : undefined}
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}

export default function LoadingOverlay() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);
  const done = useRef(false);
  const loop = [...TAPE, ...TAPE];

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    window.setTimeout(() => setOpen(false), reduce ? 240 : 720);
  }, [reduce]);

  useEffect(() => {
    if (!reduce) return;
    finish();
  }, [reduce, finish]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="intro-cover"
          className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0a] text-[#DED8C9]"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex items-center justify-between px-5 py-4 md:px-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E8FF47]">
              Sanradhya Bhowmik
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#DED8C9]/70">
              Portfolio / 26
            </span>
          </motion.div>

          <div className="relative flex min-h-0 flex-1 flex-col justify-center px-5 md:px-10">
            <motion.p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#DED8C9]/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              AI &amp; Systems Engineer
            </motion.p>

            <h1 className="font-[family-name:var(--font-outfit),system-ui,sans-serif] text-[clamp(3.4rem,14vw,8rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              {reduce ? (
                <>
                  <span className="block text-[#DED8C9]">{HI}</span>
                  <span className="mt-1 block text-[#E8FF47]">{THERE}</span>
                </>
              ) : (
                <>
                  <TypedLine text={HI} start={0} className="text-[#DED8C9]" />
                  <TypedLine
                    text={THERE}
                    start={HI.length}
                    className="mt-1 text-[#E8FF47]"
                    onComplete={finish}
                  />
                </>
              )}
            </h1>

            <motion.div
              className="mt-8 h-[3px] max-w-[12rem] overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <motion.span
                className="block h-full origin-left bg-[#E8FF47]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: TOTAL * STEP + 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            <div className="mt-7 flex flex-wrap gap-2">
              {TRAITS.map((trait, i) => (
                <motion.span
                  key={trait}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
                    i === 1
                      ? "bg-[#E8FF47] text-[#0a0a0a]"
                      : "border border-white/15 text-[#DED8C9]"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="intro-tape" aria-hidden>
            <div className="intro-tape-track">
              {loop.map((tag, i) => (
                <span key={`${tag}-${i}`}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
