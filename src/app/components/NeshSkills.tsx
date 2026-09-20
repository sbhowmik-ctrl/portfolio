"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const LIME = "#E8FF47";
const INK = "#0a0a0a";

export type SkillsContent = {
  kicker: string;
  title: string;
  intro: string;
  radar: { label: string; value: number }[];
  bars: { label: string; value: number }[];
  clouds: { label: string; value: number; note: string }[];
  groups: { title: string; items: string[] }[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function polar(i: number, n: number, r: number, cx: number, cy: number) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function RadarChart({
  data,
  active,
}: {
  data: { label: string; value: number }[];
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 112;
  const n = data.length;
  const [grow, setGrow] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setGrow(1);
      return;
    }
    setGrow(0);
    const ctrl = animate(0, 1, {
      duration: 1.2,
      delay: 0.32,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setGrow,
    });
    return () => ctrl.stop();
  }, [active, reduce]);

  const rings = [0.25, 0.5, 0.75, 1];
  const grid = rings.map((t) =>
    data
      .map((_, i) => {
        const p = polar(i, n, maxR * t, cx, cy);
        return `${p.x},${p.y}`;
      })
      .join(" ")
  );

  const axes = data.map((_, i) => polar(i, n, maxR, cx, cy));
  const live = data.map((d, i) => polar(i, n, (d.value / 100) * maxR * grow, cx, cy));
  const poly = live.map((p) => `${p.x},${p.y}`).join(" ");
  const pathD = live.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const labels = data.map((d, i) => {
    const p = polar(i, n, maxR + 24, cx, cy);
    return { ...d, ...p };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label="Skill focus radar">
      <title>Relative focus across six skill domains</title>
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.35" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx={cx}
        cy={cy}
        r={maxR + 8}
        fill="url(#radarGlow)"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.8, ease }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {grid.map((pts, i) => (
        <motion.polygon
          key={`ring-${i}`}
          points={pts}
          fill="none"
          stroke="rgba(23,23,23,0.14)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.06 + i * 0.09, ease }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {axes.map((p, i) => (
        <motion.path
          key={`axis-${data[i].label}`}
          d={`M ${cx} ${cy} L ${p.x} ${p.y}`}
          fill="none"
          stroke="rgba(23,23,23,0.16)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.18 + i * 0.05, ease }}
        />
      ))}

      <polygon points={poly} fill={LIME} fillOpacity={0.34} stroke="none" />
      <motion.path
        d={pathD}
        fill="none"
        stroke={LIME}
        strokeWidth="2.6"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />

      {live.map((p, i) => (
        <g key={data[i].label}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="11"
            fill={LIME}
            initial={{ opacity: 0 }}
            animate={
              active && grow > 0.92 && !reduce
                ? { opacity: [0.35, 0, 0.35], scale: [1, 1.55, 1] }
                : { opacity: 0, scale: 1 }
            }
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="5"
            fill={INK}
            stroke={LIME}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={active && grow > 0.55 ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: reduce ? 0 : 0.45 + i * 0.07 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        </g>
      ))}

      {labels.map((l, i) => (
        <motion.text
          key={l.label}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-neutral-800"
          fontSize="11"
          fontWeight="700"
          fontFamily="var(--font-outfit), system-ui, sans-serif"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 0.55 + i * 0.06, ease }}
        >
          {l.label}
        </motion.text>
      ))}
    </svg>
  );
}

export function SkillBubbleCloud({
  items,
  burstFrom = "center",
  className = "",
}: {
  items: string[];
  burstFrom?: "center" | "top";
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.28 });
  const reduce = useReducedMotion();
  const burst = inView || !!reduce;
  const [deltas, setDeltas] = useState<{ x: number; y: number }[]>([]);

  const measure = useCallback(() => {
    const list = ref.current;
    if (!list) return;
    const box = list.getBoundingClientRect();
    if (box.width < 8) return;
    const originX = box.width / 2;
    const originY = burstFrom === "top" ? 26 : Math.max(26, list.offsetHeight / 2);
    setDeltas(
      Array.from(list.children).map((child) => {
        const el = child as HTMLElement;
        const cx = el.offsetLeft + el.offsetWidth / 2;
        const cy = el.offsetTop + el.offsetHeight / 2;
        return { x: originX - cx, y: originY - cy };
      })
    );
  }, [burstFrom]);

  useLayoutEffect(() => {
    measure();
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    document.fonts?.ready.then(() => measure());
    return () => ro.disconnect();
  }, [measure, items]);

  return (
    <div ref={wrapRef} className={className}>
      <ul ref={ref} className="m-0 flex list-none flex-wrap content-center items-center justify-center gap-x-2.5 gap-y-2.5 p-0">
        {items.map((item, i) => {
          const d = deltas[i] ?? { x: 0, y: 0 };
          return (
            <motion.li
              key={item}
              className="m-0"
              initial={false}
              animate={burst ? { x: 0, y: 0, scale: 1, opacity: 1 } : { x: d.x, y: d.y, scale: 0.45, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 22,
                mass: 0.65,
                delay: reduce || !burst ? 0 : 0.03 + i * 0.018,
              }}
            >
              <span
                className={`inline-flex whitespace-nowrap rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-bold leading-none text-neutral-950 shadow-[0_8px_18px_rgba(0,0,0,0.12)] sm:px-3.5 sm:py-2 sm:text-[12px] ${burst ? "nesh-skill-bubble" : ""}`}
                style={
                  {
                    backgroundColor: LIME,
                    "--drift": `${5.6 + (i % 5) * 0.35}s`,
                    "--drift-delay": `${1 + (i % 7) * 0.07}s`,
                  } as CSSProperties
                }
              >
                {item}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

const GROUP_SHORT: Record<string, string> = {
  "Programming Languages": "Lang",
  "Machine Learning, NLP & GenAI": "GenAI",
  "Web Frameworks": "Web",
  "Cloud Platforms & Ecosystems": "Cloud",
  "DevOps & Infrastructure": "Ops",
  "Version Control": "VCS",
  Databases: "Data",
  "Other Technical Tools": "Tools",
};

const KEY_TONES = [
  { bg: LIME, color: INK, hoverBg: INK, hoverColor: LIME },
  { bg: INK, color: "#f4f2eb", hoverBg: LIME, hoverColor: INK },
  { bg: "#ffffff", color: INK, hoverBg: LIME, hoverColor: INK },
  { bg: "#cfc9ba", color: INK, hoverBg: INK, hoverColor: LIME },
] as const;

function SkillKeygrid({ items }: { items: { item: string; group: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;

  return (
    <div ref={ref} className="mt-3 rounded-[1.5rem] border border-black/10 bg-[#efece4] p-3 md:p-4">
      <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
        <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-neutral-950 md:text-base">
          Stack keys
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Full toolkit</p>
      </div>
      <div
        className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        style={{ perspective: 980 }}
      >
        {items.map((entry, i) => {
          const tone = KEY_TONES[i % KEY_TONES.length];
          const wide = entry.item.length > 16;
          const col = i % 6;
          const row = Math.floor(i / 6);
          const wave = reduce ? 0 : 0.04 + (row + col) * 0.045;
          return (
            <motion.div
              key={entry.item}
              className={`origin-top cursor-pointer rounded-[0.9rem] px-3 py-3 will-change-transform ${wide ? "col-span-2" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
              initial={
                reduce
                  ? { opacity: 1, y: 0, rotateX: 0, backgroundColor: tone.bg, color: tone.color }
                  : {
                      opacity: 0,
                      y: -34,
                      rotateX: 58,
                      scale: 0.86,
                      backgroundColor: tone.bg,
                      color: tone.color,
                      boxShadow: "0 0px 0 0 rgba(10,10,10,0.88)",
                    }
              }
              animate={
                show
                  ? {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                      backgroundColor: tone.bg,
                      color: tone.color,
                      boxShadow: "0 7px 0 0 rgba(10,10,10,0.9)",
                    }
                  : undefined
              }
              whileHover={
                reduce
                  ? { backgroundColor: tone.hoverBg, color: tone.hoverColor }
                  : {
                      backgroundColor: tone.hoverBg,
                      color: tone.hoverColor,
                      y: 6,
                      rotateX: 8,
                      boxShadow: "0 1px 0 0 rgba(10,10,10,0.9)",
                      transition: { type: "spring", stiffness: 420, damping: 22 },
                    }
              }
              whileTap={{ y: 7, boxShadow: "0 0px 0 0 rgba(10,10,10,0.9)", scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18,
                delay: wave,
              }}
            >
              <span className="block font-[family-name:var(--font-outfit)] text-[12px] font-bold leading-tight md:text-[13px]">
                {entry.item}
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] opacity-55">
                {GROUP_SHORT[entry.group] ?? entry.group}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CloudStrip({
  clouds,
  active,
}: {
  clouds: { label: string; value: number; note: string }[];
  active: boolean;
}) {
  const fills = [LIME, "#c9c4b4", "#171717"];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {clouds.map((c, i) => (
        <div key={c.label} className="min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-[family-name:var(--font-outfit)] text-sm font-bold text-neutral-950">{c.label}</p>
            <p className="text-xs font-bold tabular-nums text-neutral-600">{c.value}</p>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-neutral-500">{c.note}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: fills[i] }}
              initial={{ width: 0 }}
              animate={active ? { width: `${c.value}%` } : undefined}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NeshSkills({ content }: { content: SkillsContent }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduce = useReducedMotion();
  const active = inView || !!reduce;

  const allItems = useMemo(
    () => content.groups.flatMap((g) => g.items.map((item) => ({ item, group: g.title }))),
    [content.groups]
  );

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.75, ease }}
      className="scroll-mt-8 px-5 py-14 md:px-10 md:py-16 lg:px-12"
    >
      <span className="inline-flex rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
        {content.kicker}
      </span>
      <h2 className="mt-3 whitespace-pre-line font-[family-name:var(--font-outfit)] text-[clamp(2.2rem,5.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-neutral-950">
        {content.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700 md:text-base">{content.intro}</p>

      <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f4f2eb]">
        <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="border-black/10 p-4 md:p-5 lg:border-r">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-neutral-950">Domain radar</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Focus</p>
            </div>
            <div className="mt-2 aspect-square max-h-[22rem] w-full">
              <RadarChart data={content.radar} active={active} />
            </div>
          </div>

          <div className="flex flex-col border-t border-black/10 p-4 md:p-5 lg:border-t-0">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-neutral-950">Daily drivers</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Relative</p>
            </div>
            <ul className="mt-3 space-y-2.5">
              {content.bars.map((bar, i) => (
                <li key={bar.label}>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="text-[13px] font-semibold leading-tight text-neutral-800">{bar.label}</span>
                    <span className="text-[11px] font-bold tabular-nums text-neutral-500">{bar.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: LIME }}
                      initial={{ width: 0 }}
                      animate={active ? { width: `${bar.value}%` } : undefined}
                      transition={{ duration: 0.85, delay: 0.08 + i * 0.05, ease }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-black/10 pt-3">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-neutral-950">Cloud coverage</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Platforms</p>
              </div>
              <CloudStrip clouds={content.clouds} active={active} />
            </div>
          </div>
        </div>
      </div>

      <SkillKeygrid items={allItems} />
    </motion.section>
  );
}
