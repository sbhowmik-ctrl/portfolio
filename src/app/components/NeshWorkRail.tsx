"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LIME = "#E8FF47";
const ST_ID = "nesh-work-rail";

type Item = {
  id: string;
  name: string;
  index: string;
  tags: string[];
  blurb: string;
  image: string;
  href: string;
};

type Props = {
  kicker: string;
  title: string;
  intro: string;
  items: Item[];
};

/**
 * Selected Work: CSS sticky panel + extra scroll distance.
 * Vertical scroll while stuck drives the horizontal card track.
 * Do not use GSAP pin here — pin-spacers show up as empty beige below the cards.
 */
export default function NeshWorkRail({ kicker, title, intro, items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const light = lightRef.current;
    if (!section || !sticky || !viewport || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-work-card]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Remove any previous instance (HMR / strict mode)
    ScrollTrigger.getById(ST_ID)?.kill();
    ScrollTrigger.getAll()
      .filter((t) => t.vars?.id === ST_ID || t.trigger === section)
      .forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      const getTravel = () => {
        const overflow = track.scrollWidth - viewport.clientWidth;
        if (overflow > 8) return overflow;
        return Math.max((items.length - 1) * 380, 400);
      };

      const syncHeight = () => {
        const next = sticky.offsetHeight + getTravel();
        const prev = Number.parseFloat(section.style.height) || 0;
        if (Math.abs(prev - next) > 2) {
          section.style.height = `${next}px`;
        }
      };

      gsap.set(track, { x: 0, force3D: true });
      gsap.set(cards, { force3D: true, clearProps: "opacity,scale" });
      syncHeight();

      const tween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          id: ST_ID,
          trigger: section,
          pin: sticky,
          // Extra distance lives on `section.style.height` — a GSAP spacer
          // was showing as the empty beige block under the cards.
          pinSpacing: false,
          anticipatePin: 1,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.3,
          invalidateOnRefresh: true,
          onRefresh: syncHeight,
          onUpdate: (self) => {
            const p = self.progress;
            if (progress) gsap.set(progress, { scaleX: p });
            if (reduce) return;

            const view = viewport.getBoundingClientRect();
            const focusX = view.left + view.width * 0.4;
            for (const card of cards) {
              const box = card.getBoundingClientRect();
              const active =
                1 - Math.min(1, Math.abs(box.left + box.width / 2 - focusX) / (view.width * 0.5));
              gsap.set(card, {
                scale: 0.96 + active * 0.04,
                opacity: 0.88 + active * 0.12,
              });
            }
            if (light) {
              gsap.set(light, {
                x: view.width * (0.2 + p * 0.55),
                opacity: 0.35 + Math.sin(p * Math.PI) * 0.35,
              });
            }
          },
        },
      });

      const refresh = () => {
        syncHeight();
        ScrollTrigger.refresh();
      };

      track.querySelectorAll("img").forEach((img) => {
        const el = img as HTMLImageElement;
        if (!el.complete) el.addEventListener("load", refresh, { once: true });
      });
      window.addEventListener("resize", refresh);
      const timers = [80, 400].map((ms) => window.setTimeout(refresh, ms));

      return () => {
        window.removeEventListener("resize", refresh);
        timers.forEach(clearTimeout);
        tween.scrollTrigger?.kill();
        tween.kill();
        section.style.height = "";
      };
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section id="work" ref={sectionRef} className="relative z-10 w-full max-w-full overflow-x-clip scroll-mt-8 bg-neutral-950">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[100svh] min-h-[640px] w-full max-w-full flex-col overflow-hidden bg-neutral-950 text-white"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(232,255,71,0.08), transparent 55%), radial-gradient(ellipse 55% 40% at 85% 100%, rgba(255,255,255,0.04), transparent 50%)",
          }}
        />

        <div
          ref={lightRef}
          className="pointer-events-none absolute left-1/2 top-[35%] z-[1] h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle, rgba(232,255,71,0.2) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />

        <div className="relative z-[2] shrink-0 px-5 pb-3 pt-14 md:px-10 md:pt-16 lg:px-12">
          <span className="inline-flex rounded-full border border-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
            {kicker}
          </span>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl whitespace-pre-line font-[family-name:var(--font-outfit)] text-[clamp(1.9rem,4.2vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.04em]">
              {title}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400 lg:text-right">{intro}</p>
          </div>
          <div className="relative mt-5 h-[2px] max-w-xs overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, rgba(232,255,71,0.4), ${LIME})`,
                boxShadow: "0 0 12px rgba(232,255,71,0.45)",
              }}
            />
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative z-[2] min-h-0 w-full min-w-0 flex-1 overflow-hidden"
        >
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-5 flex h-full w-max items-center gap-5 pr-12 will-change-transform md:left-10 md:pr-16 lg:left-12"
          >
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                data-work-card
                className="group relative block h-[min(50vh,400px)] w-[min(78vw,360px)] shrink-0 overflow-hidden rounded-[1.75rem] bg-neutral-900 md:w-[380px]"
              >
                <div
                  className="pointer-events-none absolute inset-0 z-[5] rounded-[1.75rem]"
                  aria-hidden
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(232,255,71,0.35), 0 0 40px rgba(232,255,71,0.08)",
                  }}
                />
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  sizes="380px"
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                <span className="absolute left-4 top-4 z-[4] flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-xs font-bold">
                  {item.index}
                </span>
                <div className="absolute right-4 top-4 z-[4] flex flex-wrap justify-end gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 z-[4] p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold">{item.name}</h3>
                      <p className="mt-1 text-sm text-neutral-300">{item.blurb}</p>
                    </div>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-950"
                      style={{
                        backgroundColor: LIME,
                        boxShadow: "0 0 18px rgba(232,255,71,0.3)",
                      }}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
