"use client";

import HeroSection from "@/app/components/HeroSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="holographic-bg min-h-screen bg-slate-950 text-slate-100">
      <HeroSection />

      <motion.section
        className="border-t border-slate-800 bg-slate-950/60"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Core Focus Areas
          </h2>
          <p className="readable-text mt-3 max-w-2xl text-sm text-slate-200 md:text-base">
            Engineering systems that connect AI models, decentralized protocols, and cloud-native
            infrastructure into resilient, production-grade ecosystems.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 md:gap-8">
            <article className="holographic-card min-h-[180px] rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.65)] md:p-8 md:min-h-[200px]">
              <h3 className="text-lg font-semibold text-slate-50 md:text-xl">Artificial Intelligence Systems</h3>
              <p className="readable-text mt-3 text-sm text-slate-200 md:text-base">
                Designing data pipelines, model lifecycles, and inference layers that move from notebooks
                to real-world, reliable AI services.
              </p>
            </article>

            <article className="holographic-card min-h-[180px] rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.65)] md:p-8 md:min-h-[200px]">
              <h3 className="text-lg font-semibold text-slate-50 md:text-xl">Systems &amp; Distributed Architecture</h3>
              <p className="readable-text mt-3 text-sm text-slate-200 md:text-base">
                Building secure, observable components that integrate services, data layers, and application backends.
              </p>
            </article>

            <article className="holographic-card min-h-[180px] rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.65)] md:p-8 md:min-h-[200px]">
              <h3 className="text-lg font-semibold text-slate-50 md:text-xl">Cloud Infrastructure &amp; DevOps</h3>
              <p className="readable-text mt-3 text-sm text-slate-200 md:text-base">
                Containerized, observable deployments with CI/CD, enabling fast iteration and stable,
                scalable rollouts of intelligent systems.
              </p>
            </article>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
