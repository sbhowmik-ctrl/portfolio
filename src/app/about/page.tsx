"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Database } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const featuredProjects = [
  {
    tag: "DEVTOOLS · ON-DEVICE AI",
    title: "Blindspot — Local AI Code Reviewer",
    techs: "Node.js, node-llama-cpp, GGUF, simple-git",
    description:
      "Privacy-first CLI that reviews uncommitted git diffs with local GGUF models—zero cloud APIs—and writes a markdown report before commit.",
    linkText: "View Project Details",
    href: "/projects",
    image: "/images/ml-models-diagram.png",
    imageBg: "rgb(16 185 129 / 0.12)",
  },
  {
    tag: "EDGE AI · VOICE · ASR",
    title: "Vaani — Edge Voice UI & Indic ASR",
    techs: "Next.js, WebGPU, Gemma, FastAPI, LoRA",
    description:
      "Offline multilingual (EN/HI/BN) voice kiosk for government form automation with on-device Gemma and a fine-tuned Indic ASR (77.46% accuracy).",
    linkText: "View Project Details",
    href: "/projects",
    image: "/images/conversational-ai.png",
    imageBg: "rgb(20 184 166 / 0.12)",
  },
  {
    tag: "DEEP LEARNING · CLOUD GPU",
    title: "Deepfake Detection Web App",
    techs: "Xception, EfficientNet, XGBoost, Modal, Next.js",
    description:
      "Ensemble Real/Fake classifier with Modal T4 GPU FastAPI inference and a Next.js + Firebase app for auth and detection history.",
    linkText: "View Project Details",
    href: "/projects",
    image: "/images/deepfake-detection.png",
    imageBg: "rgb(139 92 246 / 0.12)",
  },
];

const coreTechItems = [
  {
    title: "Advanced Python",
    description:
      "Object-oriented programming, asynchronous processing, and performance optimization.",
  },
  {
    title: "Deep Learning Frameworks",
    description:
      "Extensive experience with PyTorch, TensorFlow, and Hugging Face Transformers.",
  },
  {
    title: "Data Engineering",
    description:
      "Expertise in NumPy, Pandas, and Spark for high-volume data manipulation.",
  },
];

const infrastructureItems = [
  {
    title: "Cloud Computing",
    description:
      "AWS (SageMaker, Lambda, S3) and GCP Vertex AI for scalable deployments.",
  },
  {
    title: "MLOps & Pipelines",
    description:
      "Containerization with Docker, Kubernetes, and automated CI/CD for ML models.",
  },
  {
    title: "Vector Databases",
    description:
      "Implementation of Pinecone and Milvus for efficient semantic search architectures.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F4F7FB] text-slate-800">
      {/* Subtle background - softer tones */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-violet-400/12 blur-3xl" />
      </div>

      {/* Page header */}
      <header className="relative border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Engineering Intelligent Ecosystems
          </h1>
          <p className="readable-text mt-3 max-w-2xl text-base text-slate-600 md:text-[1.0625rem]">
            CSE (AIML) engineer building scalable, decentralized, and production-ready intelligent
            systems—from AI pipelines to high-reliability infrastructure and cloud-native deployments.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "AI Systems",
                body: "End-to-end ML pipelines & intelligent services",
              },
              {
                title: "Systems Architecture",
                body: "Distributed systems, consistency, and secure protocols",
              },
              {
                title: "Cloud & DevOps",
                body: "Scalable, observable, and automated deployments",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)]"
              >
                <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Featured Projects */}
        <motion.section
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Featured <span className="text-cyan-700">Projects</span>
            </h2>
            <p className="readable-text mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Highly modern and professional implementations of AI and Machine Learning. Building the
              bridge between complex data and actionable insights.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <motion.article
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-colors hover:border-cyan-500/30 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)]"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="h-36 bg-cover bg-center md:h-40"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                    backgroundColor: project.imageBg,
                  }}
                />
                <div className="p-5 md:p-6">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700">
                    {project.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500">{project.techs}</p>
                  <p className="readable-text mt-3 text-sm text-slate-600">
                    {project.description}
                  </p>
                  <Link
                    href={project.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-700 transition-colors hover:text-teal-700"
                  >
                    {project.linkText}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Technical Foundations & Production */}
        <motion.section
          className="mt-16 md:mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-white p-6 shadow-[0_0_30px_rgba(6,182,212,0.06)] md:p-8">
            {/* Top accent */}
            <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" aria-hidden />

            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-block rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                  Expertise
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Technical Foundations &amp; Production
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  Core technologies and infrastructure that power production-ready systems.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Core Technologies */}
              <div className="group/col relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/15 to-transparent opacity-0 transition-opacity group-hover/col:opacity-100" aria-hidden />
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-cyan-500/25 md:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/35 bg-cyan-500/10 text-cyan-700">
                      <Code2 className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wider text-slate-900">
                      Core Technologies
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {coreTechItems.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border-l-2 border-cyan-500/45 bg-white py-3.5 pl-4 pr-4 transition-colors hover:border-cyan-500/70 hover:bg-cyan-50/50"
                      >
                        <h4 className="text-sm font-semibold text-slate-900 md:text-base">
                          {item.title}
                        </h4>
                        <p className="readable-text mt-1.5 text-sm text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="group/col relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-teal-500/15 to-transparent opacity-0 transition-opacity group-hover/col:opacity-100" aria-hidden />
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-teal-500/25 md:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-500/35 bg-teal-500/10 text-teal-700">
                      <Database className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wider text-slate-900">
                      Infrastructure
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {infrastructureItems.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border-l-2 border-teal-500/45 bg-white py-3.5 pl-4 pr-4 transition-colors hover:border-teal-500/70 hover:bg-teal-50/50"
                      >
                        <h4 className="text-sm font-semibold text-slate-900 md:text-base">
                          {item.title}
                        </h4>
                        <p className="readable-text mt-1.5 text-sm text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
