"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check, Github, Linkedin } from "lucide-react";
import { NESH_NAV } from "@/lib/neshNav";
import { useNavSlot } from "@/app/components/NeshMorphNav";

const LIME = "#E8FF47";

type Props = {
  wordmark: string;
  description: string;
  stats: { value: string; label: string }[];
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  activeId: string;
  navDocked: boolean;
  navSettled: boolean;
};

function NavSlot({
  id,
  children,
  show,
}: {
  id: string;
  children: React.ReactNode;
  show: boolean;
}) {
  const ref = useNavSlot(id);
  return (
    <div ref={ref} className="w-full min-h-[40px]">
      <div className={show ? "opacity-100" : "pointer-events-none opacity-0"}>{children}</div>
    </div>
  );
}

export default function NeshSidebar({
  wordmark,
  description,
  stats,
  email,
  linkedinUrl,
  githubUrl,
  activeId,
  navDocked,
  navSettled,
}: Props) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const showPills = navSettled || (navDocked && !!reduce);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <aside className="flex h-full min-h-0 flex-col gap-3 overflow-x-hidden overflow-y-auto p-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:p-4">
      <div className="rounded-[1.35rem] bg-[#efece3] p-4">
        <div className="flex items-start justify-between gap-2">
          <div
            className="rounded-xl px-2.5 py-1.5 font-[family-name:var(--font-outfit)] text-sm font-black tracking-tight text-neutral-950 sm:text-base"
            style={{ backgroundColor: LIME }}
          >
            {wordmark}
            <sup className="ml-0.5 text-[10px] font-bold">®</sup>
          </div>
          <div className="flex gap-1.5">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-neutral-800 transition hover:bg-white"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-neutral-800 transition hover:bg-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-neutral-600">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-2xl bg-[#efece3] p-3">
            {i === 0 ? (
              <span
                className="mb-1 inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-black text-neutral-950"
                style={{ backgroundColor: LIME }}
              >
                AI
              </span>
            ) : (
              <span className="mb-1 block text-lg font-black" style={{ color: LIME }}>
                {s.value}
              </span>
            )}
            {i === 0 ? (
              <p className="font-[family-name:var(--font-outfit)] text-xl font-bold leading-none text-neutral-950">
                {s.value}
              </p>
            ) : null}
            <p className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-wide text-neutral-600">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <nav className="flex flex-col gap-1.5" aria-label="Sections">
        {NESH_NAV.map((item) => {
          const Icon = item.icon;
          const active = activeId === item.id;
          const isSidebarOnly = item.side === null;
          const pill = (
            <Link
              href={item.href}
              className={`flex items-center gap-2.5 rounded-full px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition ${
                active
                  ? "text-neutral-950"
                  : "bg-[#efece3]/80 text-neutral-700 hover:bg-[#efece3]"
              }`}
              style={active ? { backgroundColor: LIME } : undefined}
              tabIndex={showPills || isSidebarOnly ? undefined : -1}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );

          if (isSidebarOnly) {
            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  opacity: showPills ? 1 : 0,
                  height: showPills ? "auto" : 0,
                  marginBottom: showPills ? 0 : 0,
                }}
                transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.15 }}
                className="overflow-hidden"
              >
                {pill}
              </motion.div>
            );
          }

          return (
            <NavSlot key={item.id} id={item.id} show={showPills}>
              {pill}
            </NavSlot>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 pt-2">
        <div className="flex items-center gap-2 overflow-hidden rounded-full bg-[#efece3] px-3 py-2">
          <span className="min-w-0 flex-1 truncate text-[11px] text-neutral-700">{email}</span>
          <button
            type="button"
            onClick={copyEmail}
            className="shrink-0 text-neutral-600 transition hover:text-neutral-950"
            aria-label="Copy email"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <Link
          href="/contact"
          className="flex w-full items-center justify-center rounded-2xl py-3.5 text-sm font-black text-neutral-950 transition hover:brightness-95"
          style={{ backgroundColor: LIME }}
        >
          Book a Call
        </Link>
      </div>
    </aside>
  );
}

export function useSectionSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "home");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id === "home" ? "top" : id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top?.target?.id) return;
        setActiveId(top.target.id === "top" ? "home" : top.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
