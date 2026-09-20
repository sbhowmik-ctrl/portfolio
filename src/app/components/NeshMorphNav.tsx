"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  NESH_NAV,
  NESH_NAV_LAYOUT_TRANSITION,
  type NeshNavItem,
} from "@/lib/neshNav";

const LIME = "#E8FF47";

export const NESH_MORPH_NAV = NESH_NAV.filter((i) => i.side !== null);

type Rect = { top: number; left: number; width: number; height: number };

type AnchorApi = {
  setOrigin: (id: string, el: HTMLElement | null) => void;
  setSlot: (id: string, el: HTMLElement | null) => void;
};

const NavAnchorContext = createContext<AnchorApi | null>(null);

export function useNavOrigin(id: string) {
  const api = useContext(NavAnchorContext);
  return useCallback(
    (el: HTMLElement | null) => {
      api?.setOrigin(id, el);
    },
    [api, id]
  );
}

export function useNavSlot(id: string) {
  const api = useContext(NavAnchorContext);
  return useCallback(
    (el: HTMLElement | null) => {
      api?.setSlot(id, el);
    },
    [api, id]
  );
}

function readRect(el: HTMLElement | null): Rect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width < 2 && r.height < 2) return null;
  return { top: r.top, left: r.left, width: r.width, height: Math.max(r.height, 20) };
}

function clampRect(rect: Rect): Rect {
  if (typeof window === "undefined") return rect;
  const pad = 12;
  const width = Math.min(rect.width, window.innerWidth - pad * 2);
  const maxLeft = Math.max(pad, window.innerWidth - width - pad);
  return {
    ...rect,
    width,
    left: Math.min(Math.max(rect.left, pad), maxLeft),
  };
}

export function NeshNavAnchorProvider({
  children,
  navDocked,
  activeId,
  ready,
  onSettledChange,
}: {
  children: React.ReactNode;
  navDocked: boolean;
  activeId: string;
  ready: boolean;
  onSettledChange?: (settled: boolean) => void;
}) {
  const origins = useRef(new Map<string, HTMLElement>());
  const slots = useRef(new Map<string, HTMLElement>());
  const [anchorGen, setAnchorGen] = useState(0);

  const setOrigin = useCallback((id: string, el: HTMLElement | null) => {
    if (el) origins.current.set(id, el);
    else origins.current.delete(id);
    setAnchorGen((n) => n + 1);
  }, []);

  const setSlot = useCallback((id: string, el: HTMLElement | null) => {
    if (el) slots.current.set(id, el);
    else slots.current.delete(id);
    setAnchorGen((n) => n + 1);
  }, []);

  const api = useMemo(() => ({ setOrigin, setSlot }), [setOrigin, setSlot]);

  return (
    <NavAnchorContext.Provider value={api}>
      {children}
      <NeshFlyingNav
        navDocked={navDocked}
        activeId={activeId}
        ready={ready}
        origins={origins}
        slots={slots}
        anchorGen={anchorGen}
        onSettledChange={onSettledChange}
      />
    </NavAnchorContext.Provider>
  );
}

function NeshFlyingNav({
  navDocked,
  activeId,
  ready,
  origins,
  slots,
  anchorGen,
  onSettledChange,
}: {
  navDocked: boolean;
  activeId: string;
  ready: boolean;
  origins: React.MutableRefObject<Map<string, HTMLElement>>;
  slots: React.MutableRefObject<Map<string, HTMLElement>>;
  anchorGen: number;
  onSettledChange?: (settled: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const [heroRects, setHeroRects] = useState<Record<string, Rect>>({});
  const [slotRects, setSlotRects] = useState<Record<string, Rect>>({});
  const [lockedHero, setLockedHero] = useState<Record<string, Rect> | null>(null);
  const [settled, setSettled] = useState(false);

  const measureHero = useCallback(() => {
    const nextHero: Record<string, Rect> = {};
    for (const item of NESH_MORPH_NAV) {
      const h = readRect(origins.current.get(item.id) ?? null);
      if (h) nextHero[item.id] = h;
    }
    setHeroRects(nextHero);
    return nextHero;
  }, [origins]);

  const measureSlots = useCallback(() => {
    const nextSlots: Record<string, Rect> = {};
    for (const item of NESH_MORPH_NAV) {
      const s = readRect(slots.current.get(item.id) ?? null);
      if (s) nextSlots[item.id] = s;
    }
    setSlotRects(nextSlots);
    return nextSlots;
  }, [slots]);

  useLayoutEffect(() => {
    if (!navDocked) {
      setLockedHero(null);
      setSettled(false);
      measureHero();
      measureSlots();
      onSettledChange?.(false);
    }
  }, [navDocked, measureHero, measureSlots, onSettledChange, ready, anchorGen]);

  useLayoutEffect(() => {
    if (!navDocked) return;
    const frozen = measureHero();
    setLockedHero(frozen);
    measureSlots();
    setSettled(false);
    onSettledChange?.(false);

    const ms = reduce ? 0 : NESH_NAV_LAYOUT_TRANSITION.duration * 1000 + NESH_MORPH_NAV.length * 50 + 80;
    const t = window.setTimeout(() => {
      setSettled(true);
      onSettledChange?.(true);
    }, ms);
    return () => window.clearTimeout(t);
  }, [navDocked, measureHero, measureSlots, onSettledChange, reduce]);

  useEffect(() => {
    const onScrollOrResize = () => {
      if (!navDocked) measureHero();
      measureSlots();
    };
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize);
    };
  }, [navDocked, measureHero, measureSlots]);

  // Hero links are real DOM now — only overlay during the dock morph.
  if (!ready || settled || !navDocked) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      {NESH_MORPH_NAV.map((item, index) => {
        const from = (lockedHero ?? heroRects)[item.id];
        const to = slotRects[item.id];
        if (!from || !to) return null;

        return (
          <FlyingItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            reduce={!!reduce}
            from={clampRect(from)}
            to={clampRect(to)}
            delay={reduce ? 0 : index * 0.05}
          />
        );
      })}
    </div>
  );
}

function FlyingItem({
  item,
  active,
  reduce,
  from,
  to,
  delay,
}: {
  item: NeshNavItem;
  active: boolean;
  reduce: boolean;
  from: Rect;
  to: Rect;
  delay: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      className="pointer-events-auto absolute overflow-hidden"
      initial={{
        top: from.top,
        left: from.left,
        width: from.width,
        height: Math.max(from.height, 20),
      }}
      animate={{
        top: to.top,
        left: to.left,
        width: to.width,
        height: Math.max(to.height, 40),
      }}
      transition={reduce ? { duration: 0 } : { ...NESH_NAV_LAYOUT_TRANSITION, delay }}
    >
      <Link
        href={item.href}
        className={`flex h-full w-full items-center gap-2.5 rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.14em] transition ${
          active ? "text-neutral-950" : "text-neutral-700"
        }`}
        style={{ backgroundColor: active ? LIME : "rgba(239,236,227,0.95)" }}
        tabIndex={-1}
      >
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 14 }}
          transition={{ duration: reduce ? 0 : 0.28, delay: delay + 0.2 }}
          className="flex shrink-0 overflow-hidden"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </motion.span>
        <span className="truncate whitespace-nowrap">{item.label}</span>
      </Link>
    </motion.div>
  );
}
