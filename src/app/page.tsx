"use client";

import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import { motion } from "framer-motion";
import { Brain, Network, CloudCog } from "lucide-react";

const focusCards = [
  {
    icon: Brain,
    label: "AI Systems",
    title: "Artificial Intelligence Systems",
    description:
      "Designing data pipelines, model lifecycles, and inference layers that move from notebooks to real-world, reliable AI services.",
    accent: "cyan",
    href: "/about",
  },
  {
    icon: Network,
    label: "Architecture",
    title: "Systems & Distributed Architecture",
    description:
      "Building secure, observable components that integrate services, data layers, and application backends.",
    accent: "violet",
    href: "/projects",
  },
  {
    icon: CloudCog,
    label: "Cloud & DevOps",
    title: "Cloud Infrastructure & DevOps",
    description:
      "Containerized, observable deployments with CI/CD, enabling fast iteration and stable, scalable rollouts of intelligent systems.",
    accent: "teal",
    href: "/about",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-slate-100">
      <HeroSection />

      <motion.section
        id="focus-areas"
        className="relative scroll-mt-24 border-t border-slate-800/80"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-12">
            <span className="inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Expertise
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
              Core Focus <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Areas</span>
            </h2>
            <p className="readable-text mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
              Engineering systems that connect AI models, decentralized protocols, and cloud-native
              infrastructure into resilient, production-grade ecosystems.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 md:gap-8">
            {focusCards.map((card, i) => {
              const Icon = card.icon;
              const accentClasses =
                card.accent === "cyan"
                  ? "border-cyan-500/40 hover:border-cyan-500/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]"
                  : card.accent === "violet"
                    ? "border-violet-500/40 hover:border-violet-500/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]"
                    : "border-teal-500/40 hover:border-teal-500/60 hover:shadow-[0_0_40px_rgba(20,184,166,0.12)]";
              const iconBg =
                card.accent === "cyan"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : card.accent === "violet"
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-teal-500/10 text-teal-400";

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={card.href}
                    className={`group relative flex overflow-hidden rounded-3xl border bg-slate-900/70 p-6 transition-all duration-300 md:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${accentClasses}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {card.label}
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-slate-50 md:text-xl">
                          {card.title}
                        </h3>
                        <p className="readable-text mt-3 text-sm leading-relaxed text-slate-400">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.02] group-hover:bg-white/[0.04]" aria-hidden />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
