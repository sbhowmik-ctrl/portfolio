"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import NeshHero from "@/app/components/NeshHero";
import NeshSidebar, { useSectionSpy } from "@/app/components/NeshSidebar";
import NeshJourneyPath from "@/app/components/NeshJourneyPath";
import NeshWorkRail from "@/app/components/NeshWorkRail";
import NeshSkills, { SkillBubbleCloud, type SkillsContent } from "@/app/components/NeshSkills";
import { NeshNavAnchorProvider } from "@/app/components/NeshMorphNav";

export type HomeContent = {
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    traits: string[];
    focus?: string[];
    now?: { kicker: string; label: string };
    wordmark?: string;
    portrait?: string;
  };
  journey: {
    kicker: string;
    title: string;
    intro: string;
    spotlight?: {
      headline: string;
      body: string;
      pillars: { title: string; body: string }[];
    };
    items: {
      year: string;
      fullYear: string;
      title: string;
      summary: string;
      detail: string;
      handle: string;
      ago: string;
    }[];
  };
  work: {
    kicker: string;
    title: string;
    intro: string;
    items: {
      id: string;
      name: string;
      index: string;
      tags: string[];
      blurb: string;
      image: string;
      href: string;
    }[];
  };
  skills: SkillsContent;
  capabilities: {
    kicker: string;
    title: string;
    subtitle: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  services: {
    kicker: string;
    title: string;
    intro: string;
    plans: {
      name: string;
      price: string;
      priceNote: string;
      description: string;
      features: string[];
      footer: string;
      cta: { label: string; href: string };
      featured?: boolean;
    }[];
  };
  cta: {
    title: string;
    body: string;
    prompt: string;
    button: { label: string; href: string };
  };
  faq: {
    kicker: string;
    title: string;
    items: { q: string; a: string }[];
  };
};

type ContactBits = {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const BEIGE = "#DED8C9";
const LIME = "#E8FF47";

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.75, ease }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Capabilities({ content }: { content: HomeContent["capabilities"] }) {
  return (
    <Reveal id="capabilities" className="scroll-mt-8 px-5 py-20 md:px-10 md:py-28 lg:px-12">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-600">{content.kicker}</p>
      <h2 className="mt-4 whitespace-pre-line font-[family-name:var(--font-outfit)] text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-neutral-950">
        {content.title}
      </h2>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{content.subtitle}</p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">{content.intro}</p>
      <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
        {content.items.map((item, i) => (
          <div key={item.title} className="grid gap-3 py-7 md:grid-cols-[0.9fr_1.2fr] md:gap-10">
            <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-neutral-950 md:text-2xl">
              <span className="mr-3 text-neutral-400">0{i + 1}</span>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 md:text-base">{item.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Services({ content }: { content: HomeContent["services"] }) {
  const [active, setActive] = useState(0);
  const plan = content.plans[active] ?? content.plans[0];
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    const n = content.plans.length;
    const next = ((index % n) + n) % n;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  return (
    <Reveal id="services" className="scroll-mt-8 px-5 py-20 md:px-10 md:py-28 lg:px-12">
      <span className="inline-flex rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
        {content.kicker}
      </span>
      <h2 className="mt-5 whitespace-pre-line font-[family-name:var(--font-outfit)] text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-neutral-950">
        {content.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">{content.intro}</p>

      <div className="mt-12 overflow-hidden rounded-[2rem] bg-neutral-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
        <div className="grid lg:grid-cols-[minmax(16rem,0.38fr)_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Engagement types"
            className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-r lg:border-white/10 lg:p-0 [&::-webkit-scrollbar]:hidden"
          >
            {content.plans.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      select(i + 1, true);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      select(i - 1, true);
                    }
                  }}
                  className={`relative min-w-[11.5rem] shrink-0 rounded-2xl px-4 py-4 text-left transition lg:min-w-0 lg:rounded-none lg:px-7 lg:py-8 ${
                    selected ? "bg-white/10 lg:bg-transparent" : "hover:bg-white/5"
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId={reduce ? undefined : "service-active"}
                      className="absolute inset-x-3 inset-y-2 rounded-xl lg:inset-x-0 lg:inset-y-0 lg:rounded-none"
                      style={{ backgroundColor: "rgba(232,255,71,0.1)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  {selected ? (
                    <span
                      className="absolute left-0 top-4 hidden h-[calc(100%-2rem)] w-[3px] rounded-r lg:block"
                      style={{ backgroundColor: LIME }}
                    />
                  ) : null}
                  <span className="relative z-[1] block text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                    0{i + 1}
                  </span>
                  <span className="relative z-[1] mt-2 block font-[family-name:var(--font-outfit)] text-lg font-bold tracking-tight lg:text-xl">
                    {item.name}
                  </span>
                  <span className={`relative z-[1] mt-1 block text-xs ${selected ? "text-[#E8FF47]" : "text-neutral-500"}`}>
                    {item.price}
                    {item.priceNote ? ` · ${item.priceNote}` : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[22rem] overflow-hidden p-6 md:p-9 lg:min-h-[26rem] lg:p-12">
            <p
              className="pointer-events-none absolute -right-4 -top-6 select-none font-[family-name:var(--font-outfit)] text-[clamp(6rem,18vw,11rem)] font-bold leading-none tracking-[-0.08em] text-white/[0.06]"
              aria-hidden
            >
              0{active + 1}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={plan.name}
                id="service-panel"
                role="tabpanel"
                aria-labelledby={`service-tab-${active}`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-[1]"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                  Step 0{active + 1} of 0{content.plans.length}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-outfit)] text-[clamp(1.85rem,4vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.04em]">
                  {plan.name}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-bold text-[#E8FF47]">
                  {plan.price}
                  {plan.priceNote ? (
                    <span className="ml-2 text-sm font-semibold text-neutral-500">{plan.priceNote}</span>
                  ) : null}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">{plan.description}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {plan.features.map((f, fi) => (
                    <li key={f} className="flex gap-3 text-sm leading-snug text-neutral-200">
                      <span className="mt-0.5 font-[family-name:var(--font-outfit)] text-[11px] font-bold text-[#E8FF47]">
                        0{fi + 1}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.footer ? (
                  <p className="mt-8 max-w-md border-t border-white/10 pt-5 text-sm italic text-neutral-400">{plan.footer}</p>
                ) : null}
                <Link
                  href={plan.cta.href}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-neutral-950 transition hover:brightness-95"
                  style={{ backgroundColor: LIME }}
                >
                  {plan.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function BigCta({ content, skills }: { content: HomeContent["cta"]; skills: string[] }) {
  return (
    <Reveal className="px-5 py-16 md:px-10 lg:px-12">
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-neutral-950 px-6 py-10 text-white sm:px-8 md:px-10 md:py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:px-12 lg:py-14">
        <div className="min-w-0">
          <h2 className="whitespace-pre-line font-[family-name:var(--font-outfit)] text-[clamp(1.85rem,4.6vw,3.35rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400 md:text-base">{content.body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <p className="text-sm text-neutral-300">{content.prompt}</p>
            <Link
              href={content.button.href}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-neutral-950"
              style={{ backgroundColor: LIME }}
            >
              {content.button.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <SkillBubbleCloud items={skills} className="min-h-[12rem] lg:min-h-[16rem]" />
      </div>
    </Reveal>
  );
}

function Faq({ content, wordmark }: { content: HomeContent["faq"]; wordmark: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal id="faq" className="relative scroll-mt-8 overflow-hidden px-5 py-20 md:px-10 md:py-28 lg:px-12">
      <p
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none font-[family-name:var(--font-outfit)] text-[clamp(2rem,9vw,5.5rem)] font-bold leading-none tracking-[-0.05em] opacity-90"
        style={{ color: LIME }}
        aria-hidden
      >
        {wordmark}
      </p>
      <div className="relative z-[1]">
        <span className="inline-flex rounded-full border border-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700">
          {content.kicker}
        </span>
        <h2 className="mt-5 whitespace-pre-line font-[family-name:var(--font-outfit)] text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-neutral-950">
          {content.title}
        </h2>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="rounded-2xl border border-black/10 bg-[#f4f2eb]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-outfit)] text-base font-bold text-neutral-950 md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

export default function NeshHome({
  content,
  contact,
}: {
  content: HomeContent;
  contact: ContactBits;
}) {
  const activeId = useSectionSpy([
    "home",
    "journey",
    "work",
    "skills",
    "capabilities",
    "services",
    "faq",
  ]);
  const wordmark = content.hero.wordmark ?? "SANRADHYA";
  const [pastHero, setPastHero] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [navSettled, setNavSettled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setNavReady(true), 950);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dock when less than ~55% of the hero remains — start the flight into the next section
        setPastHero(!entry.isIntersecting || entry.intersectionRatio < 0.55);
      },
      { threshold: [0, 0.25, 0.4, 0.55, 0.7, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const navDocked = pastHero && isLg;
  const onSettledChange = useCallback((settled: boolean) => {
    setNavSettled(settled);
  }, []);

  return (
    <NeshNavAnchorProvider
      navDocked={navDocked}
      activeId={activeId}
      ready={navReady && isLg}
      onSettledChange={onSettledChange}
    >
      <main className="relative min-h-screen overflow-x-clip text-neutral-900" style={{ backgroundColor: BEIGE }}>
        <NeshHero content={content.hero} navDocked={navDocked} />

        {/* Post-hero shell: sticky bento sidebar + scrolling main */}
        <div className="relative mx-auto flex max-w-[1600px] gap-0 lg:gap-2 lg:px-2 lg:pb-4">
          <div className="sticky top-0 z-30 hidden h-[100svh] w-[280px] shrink-0 lg:block xl:w-[300px]">
            <div className="h-full overflow-hidden rounded-[1.75rem] bg-[#e8e4da]/95 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-md">
              <NeshSidebar
                wordmark={wordmark}
                description={content.hero.description}
                focus={content.hero.focus}
                email={contact.email}
                linkedinUrl={contact.linkedinUrl}
                githubUrl={contact.githubUrl}
                activeId={activeId}
                navDocked={navDocked}
                navSettled={navSettled}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 overflow-x-clip rounded-none lg:rounded-[1.75rem] lg:bg-[#e8e4da]/40">
            <NeshJourneyPath {...content.journey} />
            <NeshWorkRail {...content.work} />
            <NeshSkills content={content.skills} />
            <Capabilities content={content.capabilities} />
            <Services content={content.services} />
            <BigCta
              content={content.cta}
              skills={content.skills.groups.flatMap((g) => g.items)}
            />
            <Faq content={content.faq} wordmark={wordmark} />
          </div>
        </div>

        {/* Mobile bottom CTA bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#DED8C9]/95 p-3 backdrop-blur-xl lg:hidden">
          <Link
            href="/contact"
            className="flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold text-neutral-950"
            style={{ backgroundColor: LIME }}
          >
            Book a Call
          </Link>
        </div>
      </main>
    </NeshNavAnchorProvider>
  );
}
