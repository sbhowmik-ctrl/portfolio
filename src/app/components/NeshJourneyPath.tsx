"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, Brain, Network, CloudCog } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LIME = "#E8FF47";

type Item = {
  year: string;
  fullYear: string;
  title: string;
  summary: string;
  detail: string;
  handle: string;
  ago: string;
};

type Spotlight = {
  headline: string;
  body: string;
  pillars: { title: string; body: string }[];
};

type Props = {
  kicker: string;
  title: string;
  intro: string;
  spotlight?: Spotlight;
  items: Item[];
};

const PILLAR_ICONS = [Brain, Network, CloudCog];

/** About spotlight + scroll-choreographed journey timeline. */
export default function NeshJourneyPath({ kicker, title, intro, spotlight, items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const header = headerRef.current;
    const spot = spotlightRef.current;
    if (!section || !track) return;

    if (reduce) {
      gsap.set(section.querySelectorAll(".journey-card, .journey-node, .journey-path, .journey-path-glow"), {
        clearProps: "all",
        opacity: 1,
      });
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>(track.querySelectorAll(".journey-card"));
    const nodes = gsap.utils.toArray<SVGCircleElement>(section.querySelectorAll(".journey-node"));
    const path = section.querySelector<SVGPathElement>(".journey-path");
    const pathGlow = section.querySelector<SVGPathElement>(".journey-path-glow");

    const ctx = gsap.context(() => {
      // 1) Header entrance
      if (header) {
        gsap.fromTo(
          header.children,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2) Spotlight + pillars
      if (spot) {
        gsap.fromTo(
          spot,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: spot,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
        const pillars = spot.querySelectorAll(".journey-pillar");
        gsap.fromTo(
          pillars,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: spot,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3) Path draw (base + lime glow overlay)
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        if (pathGlow) {
          gsap.set(pathGlow, { strokeDasharray: len, strokeDashoffset: len });
        }
        const pathTl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.9,
          },
        });
        pathTl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);
        if (pathGlow) {
          pathTl.to(pathGlow, { strokeDashoffset: 0, ease: "none" }, 0);
        }
      }

      // 4) Cards ride the S-curve + year pop + active glow
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        const year = card.querySelector(".journey-year");
        const body = card.querySelectorAll(".journey-body > *");

        gsap.fromTo(
          card,
          {
            x: fromLeft ? -36 : 36,
            y: 90,
            opacity: 0,
            scale: 0.9,
            rotate: fromLeft ? -2.5 : 2.5,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.75,
            },
          }
        );

        if (year) {
          gsap.fromTo(
            year,
            { y: 24, opacity: 0, scale: 0.85 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 45%",
                scrub: 0.6,
              },
            }
          );
        }

        if (body.length) {
          gsap.fromTo(
            body,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                end: "top 48%",
                scrub: 0.65,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top 65%",
          end: "bottom 40%",
          onEnter: () => card.classList.add("is-active"),
          onEnterBack: () => card.classList.add("is-active"),
          onLeave: () => card.classList.remove("is-active"),
          onLeaveBack: () => card.classList.remove("is-active"),
        });

        // Node lights up with the matching card
        const node = nodes[i];
        if (node) {
          gsap.set(node, { scale: 0.4, opacity: 0.25, transformOrigin: "50% 50%" });
          gsap.to(node, {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [items.length, reduce, spotlight]);

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-x-clip scroll-mt-8 px-4 py-20 md:px-8 md:py-28">
      <div className="relative mx-auto max-w-3xl">
        <div ref={headerRef}>
          <span className="inline-flex rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {kicker}
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-outfit)] text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-neutral-950">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">{intro}</p>
        </div>

        {spotlight ? (
          <div
            ref={spotlightRef}
            className="relative z-[2] mt-10 rounded-[1.75rem] border border-black/10 bg-[#f4f2eb] p-6 md:p-8"
          >
            <h3 className="font-[family-name:var(--font-outfit)] text-[clamp(1.6rem,3.5vw,2.35rem)] font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950">
              {spotlight.headline}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
              {spotlight.body}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {spotlight.pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
                return (
                  <article
                    key={pillar.title}
                    className="journey-pillar rounded-2xl bg-white/80 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                  >
                    <span
                      className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-950"
                      style={{ backgroundColor: LIME }}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h4 className="font-[family-name:var(--font-outfit)] text-base font-bold text-neutral-950">
                      {pillar.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 md:text-sm">
                      {pillar.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Path is scoped to the timeline only — not over the spotlight */}
        <div className="relative mt-14 overflow-x-clip">
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-full w-full md:block"
            viewBox="0 0 320 1200"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <path
              className="journey-path"
              d="M160 20 C 40 140, 280 260, 160 380 C 40 500, 280 620, 160 740 C 40 860, 280 980, 160 1120"
              stroke="rgba(23,23,23,0.18)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              className="journey-path-glow"
              d="M160 20 C 40 140, 280 260, 160 380 C 40 500, 280 620, 160 740 C 40 860, 280 980, 160 1120"
              stroke={LIME}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            {items.map((_, i) => {
              const y = 80 + i * (1000 / Math.max(items.length - 1, 1));
              const x = i % 2 === 0 ? 100 : 220;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="10" fill={LIME} opacity="0.2" />
                  <circle className="journey-node" cx={x} cy={y} r="6" fill={LIME} />
                </g>
              );
            })}
          </svg>

          <div ref={trackRef} className="relative z-[1] space-y-10 md:space-y-16">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <article
                  key={item.fullYear}
                  className={`journey-card relative z-[1] rounded-[1.75rem] border border-black/10 bg-[#f4f2eb] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-[box-shadow,border-color] duration-500 md:p-8 ${
                    i % 2 === 0 ? "md:ml-0 md:mr-[12%]" : "md:ml-[12%] md:mr-0"
                  } [&:is(.is-active)]:border-black/20 [&:is(.is-active)]:shadow-[0_22px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(232,255,71,0.35)]`}
                >
                  <p
                    className="journey-year font-[family-name:var(--font-outfit)] text-4xl font-black tracking-tight md:text-5xl"
                    style={{ color: LIME }}
                  >
                    {item.year}
                  </p>
                  <div className="journey-body">
                    <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-bold tracking-tight text-neutral-950 md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">{item.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-neutral-500">
                        {item.handle} · {item.ago}
                      </p>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition hover:bg-white"
                      >
                        {isOpen ? "Close" : "Read more"}
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-neutral-600">
                          {item.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
