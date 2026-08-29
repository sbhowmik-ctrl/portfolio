"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { NESH_NAV_LEFT, NESH_NAV_RIGHT } from "@/lib/neshNav";
import { useNavOrigin } from "@/app/components/NeshMorphNav";

type HeroContent = {
  eyebrow: string;
  titleLines: string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: { value: string; label: string }[];
  traits: string[];
  wordmark?: string;
  portrait?: string;
};

const LIME = "#E8FF47";
const BEIGE = "#DED8C9";

function HeroNavOrigin({
  item,
  align = "left",
  hidden = false,
}: {
  item: (typeof NESH_NAV_LEFT)[number];
  align?: "left" | "right";
  hidden?: boolean;
}) {
  const ref = useNavOrigin(item.id);
  const right = align === "right";

  return (
    <li ref={ref}>
      <Link
        href={item.href}
        tabIndex={hidden ? -1 : 0}
        className={`group inline-flex items-baseline gap-2 font-[family-name:var(--font-outfit)] ${
          right ? "flex-row-reverse" : ""
        } ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <span className="text-[10px] font-semibold tabular-nums text-[#E8FF47]">/</span>
        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-900 decoration-[#E8FF47] decoration-2 underline-offset-[6px] transition group-hover:underline">
          {item.label}
        </span>
      </Link>
    </li>
  );
}

function GlassCard({
  children,
  className = "",
  floatDelay = 0,
  mouseX,
  mouseY,
  factor = 1,
  reduce = false,
}: {
  children: React.ReactNode;
  className?: string;
  floatDelay?: number;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  factor?: number;
  reduce?: boolean;
}) {
  const x = useTransform(mouseX, (v) => v * factor);
  const y = useTransform(mouseY, (v) => v * factor);

  return (
    <motion.div style={{ x, y }}>
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{
          duration: 4.5 + floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className={`rounded-2xl border border-white/40 bg-white/25 shadow-[0_8px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Video flow:
 * 1) giant lime wordmark alone
 * 2) assemble portrait + glass + CTAs
 * 3) scroll parallax / fade into sidebar layout
 */
export default function NeshHero({
  content,
  navDocked = false,
}: {
  content: HeroContent;
  navDocked?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [assembled, setAssembled] = useState(false);
  const wordmark = content.wordmark ?? "SANRADHYA";
  const portrait = content.portrait ?? "/images/sanradhya-portrait-1.png";

  useEffect(() => {
    if (reduce) {
      setAssembled(true);
      return;
    }
    const t = window.setTimeout(() => setAssembled(true), 900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const wordY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);
  const uiY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * 18);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2 * 14);
  };

  const projects = content.stats[0] ?? { value: "6+", label: "Projects" };
  const years = content.stats[1] ?? { value: "4+", label: "Years of experience" };
  const title = content.titleLines.join(" ");

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative h-[100svh] min-h-[640px] w-full overflow-x-hidden"
      style={{ backgroundColor: BEIGE }}
    >
      <motion.div style={{ opacity: fadeOut }} className="absolute inset-0 overflow-hidden">
        {/* Wordmark */}
        <motion.div
          style={{ y: wordY, scale: wordScale }}
          className="pointer-events-none absolute inset-x-0 top-[max(1.25rem,5%)] z-[1] flex justify-center px-4 md:top-[max(1.5rem,4.5%)]"
          aria-hidden
        >
          <motion.span
            className="max-w-full select-none font-[family-name:var(--font-outfit)] text-[clamp(2.25rem,9.5vw,7rem)] font-bold leading-none tracking-[-0.05em]"
            style={{ color: LIME }}
          >
            {wordmark}
            <sup className="align-super text-[0.18em] font-bold">®</sup>
          </motion.span>
        </motion.div>

        <AnimatePresence>
          {assembled && (
            <>
              {/* Portrait — sharp, with soft fade-in */}
              <motion.div
                initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: portraitY }}
                className="absolute inset-x-0 bottom-0 z-[2] mx-auto flex h-[82%] max-w-[560px] items-end justify-center"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={portrait}
                    alt="Sanradhya Bhowmik"
                    fill
                    priority
                    sizes="560px"
                    className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_70%,transparent_100%)]"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="absolute left-[4%] top-[18%] z-[5] hidden sm:block md:left-[8%] lg:left-[12%]"
              >
                <GlassCard mouseX={mouseX} mouseY={mouseY} factor={1.2} reduce={!!reduce} className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-neutral-950"
                      style={{ backgroundColor: LIME }}
                    >
                      AI
                    </span>
                    <div>
                      <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold leading-none text-neutral-950">
                        {projects.value}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-800">
                        {projects.label}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="absolute bottom-[22%] left-[5%] z-[5] hidden sm:block md:left-[9%] lg:left-[13%]"
              >
                <GlassCard
                  mouseX={mouseX}
                  mouseY={mouseY}
                  factor={0.85}
                  floatDelay={0.6}
                  reduce={!!reduce}
                  className="px-5 py-4"
                >
                  <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold leading-none" style={{ color: LIME }}>
                    {years.value}
                  </p>
                  <p className="mt-1 max-w-[7rem] text-[11px] font-semibold uppercase leading-snug tracking-wider text-white drop-shadow">
                    {years.label}
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="absolute right-[16%] top-[26%] z-[5] hidden sm:block md:right-[18%] lg:right-[20%] xl:right-[22%]"
              >
                <GlassCard
                  mouseX={mouseX}
                  mouseY={mouseY}
                  factor={-0.55}
                  floatDelay={1.1}
                  reduce={!!reduce}
                  className="px-4 py-5"
                >
                  <ul className="space-y-2.5">
                    {content.traits.map((t) => (
                      <li key={t} className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rotate-45" style={{ backgroundColor: LIME }} aria-hidden />
                        <span className="text-xs font-semibold tracking-wide text-neutral-950">{t}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.75 }}
                style={{ y: uiY }}
                className="absolute inset-x-0 bottom-[12%] z-[6] flex flex-col items-center px-4 text-center"
              >
                <h1 className="max-w-3xl font-[family-name:var(--font-outfit)] text-[clamp(1.85rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.45)]">
                  {title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={content.primaryCta.href}
                    className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-bold text-neutral-950 transition hover:brightness-95"
                    style={{ backgroundColor: LIME }}
                  >
                    {content.primaryCta.label}
                  </Link>
                  <Link
                    href={content.secondaryCta.href}
                    className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-bold text-neutral-950 transition hover:brightness-95"
                    style={{ backgroundColor: LIME }}
                  >
                    {content.secondaryCta.label}
                  </Link>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ y: uiY }}
                className="absolute bottom-8 left-5 z-[4] max-w-[12rem] text-[11px] font-medium leading-snug text-neutral-900 sm:bottom-10 sm:left-8 sm:text-xs md:left-12"
              >
                {content.eyebrow}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                style={{ y: uiY }}
                className="absolute bottom-8 right-5 z-[4] max-w-[16rem] text-right text-[11px] font-medium leading-snug text-neutral-900 sm:bottom-10 sm:right-8 sm:text-xs md:right-12"
              >
                {content.description}
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Side links sit in the top corners so they miss the floating stats cards. */}
      <nav
        className="absolute left-0 top-[48%] z-[20] hidden w-auto -translate-y-1/2 flex-col items-start pl-5 lg:flex xl:pl-8"
        aria-label="Primary sections"
      >
        <ul className="flex flex-col gap-3">
          {NESH_NAV_LEFT.map((l) => (
            <HeroNavOrigin key={l.id} item={l} hidden={navDocked} />
          ))}
        </ul>
      </nav>
      <nav
        className="absolute right-0 top-[48%] z-[20] hidden w-auto -translate-y-1/2 flex-col items-end pr-5 lg:flex xl:pr-8"
        aria-label="More sections"
      >
        <ul className="flex flex-col items-end gap-3">
          {NESH_NAV_RIGHT.map((l) => (
            <HeroNavOrigin key={l.id} item={l} align="right" hidden={navDocked} />
          ))}
        </ul>
      </nav>
      <nav
        className="pointer-events-none absolute inset-x-0 top-[46%] z-[20] flex -translate-y-1/2 justify-between px-5 md:px-8 lg:hidden"
        aria-label="Sections"
      >
        <ul className="pointer-events-auto flex flex-col gap-2.5">
          {NESH_NAV_LEFT.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                className="inline-flex items-baseline gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-900"
              >
                <span className="text-[#E8FF47]">/</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="pointer-events-auto flex flex-col items-end gap-2.5">
          {NESH_NAV_RIGHT.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                className="inline-flex flex-row-reverse items-baseline gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-900"
              >
                <span className="text-[#E8FF47]">/</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
