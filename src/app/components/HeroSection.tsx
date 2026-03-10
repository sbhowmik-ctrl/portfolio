"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Network, CloudCog } from "lucide-react";

const transition = {
  duration: 1.35,
  ease: [0.22, 1, 0.36, 1] as const, // smooth ease-out
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export default function HeroSection() {
  const pictureRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pictureRef, { amount: 0.3 });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -left-40 -top-40 h-72 w-72 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-violet-500 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_55%)]" />
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:80px_80px]" />
        {/* Bottom glow accents */}
        <div className="absolute -bottom-32 left-10 h-40 w-40 rounded-full bg-cyan-500/40 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-56 w-56 rounded-full bg-indigo-500/35 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-stretch justify-center gap-6 px-4 py-8 sm:py-10 md:min-h-[calc(100dvh-6rem)] md:flex-row md:items-center md:gap-8 md:py-12 lg:py-14">
        {/* Image with text overlay */}
        <div
          ref={pictureRef}
          className="holographic-border relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 shadow-[0_24px_80px_rgba(15,23,42,0.9)] md:w-[55%] min-h-[360px] md:min-h-[440px]"
        >
          {/* Corner accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-cyan-400/60" />
            <div className="absolute right-4 bottom-4 h-10 w-10 border-b border-r border-indigo-400/60" />
          </div>
          <Image
            src="/images/sanradhya-portrait.jpg"
            alt="Sanradhya Bhowmik"
            fill
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 100vw"
            className="object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/65 via-slate-950/30 to-transparent" />

          <motion.div
            className="relative flex h-full flex-col justify-center gap-6 p-6 sm:p-8 md:p-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur"
              variants={itemVariants}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI • Systems • Cloud Infrastructure
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-balance font-playfair text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
                Engineering Intelligent Ecosystems
              </h1>
              <p className="readable-text text-pretty text-sm text-slate-100 sm:text-base md:text-[1rem]">
                CSE (AIML) engineer building scalable, decentralized, and production-ready intelligent systems—from
                AI pipelines to high-reliability infrastructure and cloud-native deployments.
              </p>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-4" variants={itemVariants}>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition-colors hover:bg-cyan-400"
              >
                Explore My Work
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className="inline-flex items-center justify-center rounded-full border border-slate-600/60 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-100 backdrop-blur transition-colors hover:border-slate-300/70 hover:bg-white/10"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Focus cards – larger with icons and graphics */}
        <div className="mt-4 grid w-full flex-1 grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
          <div className="group relative min-h-[140px] overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-800/50 md:min-h-[160px] md:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/25 blur-2xl transition-opacity group-hover:opacity-80" />
            <div className="absolute right-4 top-4 opacity-20 transition-opacity group-hover:opacity-35">
              <Brain className="h-12 w-12 text-cyan-400" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">AI Systems</p>
            <p className="readable-text mt-3 text-base font-semibold text-slate-50 md:text-lg">End-to-end ML pipelines &amp; intelligent services</p>
          </div>
          <div className="group relative min-h-[140px] overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-violet-500/40 hover:bg-slate-800/50 md:min-h-[160px] md:p-7">
            <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-violet-500/25 blur-2xl transition-opacity group-hover:opacity-80" />
            <div className="absolute right-4 top-4 opacity-20 transition-opacity group-hover:opacity-35">
              <Network className="h-12 w-12 text-violet-400" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Systems Architecture</p>
            <p className="readable-text mt-3 text-base font-semibold text-slate-50 md:text-lg">Distributed systems, consistency, and secure protocols</p>
          </div>
          <div className="group relative min-h-[140px] overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-slate-800/50 md:col-span-2 md:min-h-[150px] md:p-7">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-48 bg-gradient-to-l from-cyan-500/20 via-transparent to-transparent" />
            <div className="absolute right-6 top-6 opacity-20 transition-opacity group-hover:opacity-35">
              <CloudCog className="h-14 w-14 text-indigo-400" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cloud &amp; DevOps</p>
            <p className="readable-text mt-3 max-w-2xl text-base font-semibold text-slate-50 md:text-lg">Scalable, observable, and automated deployments</p>
          </div>
        </div>
      </div>
    </section>
  );
}
