"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Code2,
  BookOpen,
  Globe,
  BarChart3,
  ArrowRight,
  X,
  Terminal,
  Mic,
  ShieldCheck,
} from "lucide-react";

const filters = [
  { id: "all", label: "All Projects" },
  { id: "nlp", label: "Natural Language Processing" },
  { id: "computerVision", label: "Computer Vision" },
  { id: "generativeAI", label: "Generative AI" },
  { id: "deepLearning", label: "Deep Learning" },
  { id: "edgeAI", label: "Edge & On-Device AI" },
] as const;

type FilterId = (typeof filters)[number]["id"];

type ProjectCategory = Exclude<FilterId, "all">;

const projects = [
  {
    id: "blindspot",
    name: "Blindspot — Local AI Code Reviewer",
    tag: "DEVTOOLS · ON-DEVICE AI",
    categories: ["generativeAI", "edgeAI"] as ProjectCategory[],
    description:
      "Privacy-first Node.js CLI that runs on-device AI code reviews against uncommitted git diffs using local GGUF models—zero cloud API dependencies.",
    caseStudy:
      "Blindspot: Your Local Code Reviewer\n\nMost AI code review tools send your source to the cloud. Blindspot keeps everything on your machine. It inspects uncommitted git diffs with local GGUF models via node-llama-cpp, automates first-run model acquisition, runs agentic repo-diff analysis, and writes a markdown report (blindspot-report.md) before you commit. Built for developers who want LLM-quality review without leaking proprietary code.",
    keyTechs: "Node.js, node-llama-cpp, simple-git, Commander",
    keyTechsIcon: Terminal,
    metrics: "On-device GGUF inference · zero cloud APIs",
    metricsIcon: ShieldCheck,
    techStack: [
      "Node.js",
      "Commander",
      "simple-git",
      "cli-progress",
      "node-llama-cpp",
      "GGUF",
      "Git",
    ],
    imageSrc: "/images/ml-models-diagram.png",
    gradient: "bg-gradient-to-br from-emerald-500/10 to-slate-100",
  },
  {
    id: "vaani",
    name: "Vaani — Edge Voice UI & Indic ASR",
    tag: "EDGE AI · VOICE · ASR",
    categories: ["generativeAI", "nlp", "edgeAI"] as ProjectCategory[],
    description:
      "Offline multilingual (EN/HI/BN) voice kiosk for government form automation—on-device Gemma via WebGPU, conversational state machine, and fine-tuned Indic ASR.",
    caseStudy:
      "Vaani: Voice at the Edge\n\nGovernment portals and kiosks often fail people who prefer speaking in Hindi or Bengali. Vaani is an offline voice UI that runs Gemma 4 E2B (ONNX) on-device through WebGPU—no cloud STT. A conversational state machine collects, corrects, and translates spoken input into structured English JSON. FastAPI and Playwright (CDP) automate portal filling with human CAPTCHA handoffs. A custom Indic ASR LoRA reaches 77.46% accuracy (22.54% WER) on noisy field audio.",
    keyTechs: "Next.js, Transformers.js, WebGPU, Gemma, FastAPI",
    keyTechsIcon: Mic,
    metrics: "77.46% Indic ASR accuracy · 22.54% WER",
    metricsIcon: BarChart3,
    techStack: [
      "Next.js",
      "Transformers.js",
      "WebGPU",
      "Gemma 4 E2B",
      "ONNX",
      "FastAPI",
      "Playwright",
      "LoRA",
      "Indic ASR",
    ],
    imageSrc: "/images/conversational-ai.png",
    gradient: "bg-gradient-to-br from-teal-500/10 to-slate-100",
  },
  {
    id: "deepfake",
    name: "Deepfake Detection Web App",
    tag: "DEEP LEARNING · CLOUD GPU",
    categories: ["computerVision", "deepLearning"] as ProjectCategory[],
    description:
      "Ensemble deepfake detector stacking Xception and EfficientNet with an XGBoost meta-learner, served via a Modal T4 GPU FastAPI engine and a Next.js + Firebase web app.",
    caseStudy:
      "The Fraud Detective: Deepfake Detection Web App\n\nAI-generated faces are increasingly hard to spot by eye. This system stacks Xception and EfficientNet CNN feature extractors with an XGBoost meta-learner for Real/Fake classification. A serverless GPU-backed (T4) FastAPI inference engine on Modal supports single and batch analysis. The Next.js frontend uses Firebase Auth, Firestore, and Storage for authentication and persistent detection history—turning research-grade detection into a usable product.",
    keyTechs: "Xception, EfficientNet, XGBoost, FastAPI, Modal",
    keyTechsIcon: Globe,
    metrics: "Ensemble CNN + XGBoost · Modal T4 GPU inference",
    metricsIcon: BarChart3,
    techStack: [
      "Xception",
      "EfficientNet",
      "XGBoost",
      "TensorFlow/Keras",
      "FastAPI",
      "Modal",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
    ],
    imageSrc: "/images/deepfake-detection.png",
    gradient: "bg-gradient-to-br from-violet-500/10 to-slate-100",
  },
  {
    id: "ai-summarizer",
    name: "AI Text Summarizer",
    tag: "NLP SYSTEM",
    categories: ["nlp"] as ProjectCategory[],
    description:
      "An advanced NLP system implementing both extractive and abstractive summarization methods to process large-scale datasets with high semantic fidelity.",
    caseStudy:
      "The Digital Speed-Reader: AI Text Summarizer\n\nWe live in an age of information overload where we are constantly bombarded with long articles, research papers, and news reports, but we rarely have the time to read them all. My AI Text Summarizer acts as a personal assistant that handles the heavy lifting for you. It uses two different \"thinking\" methods: one that functions like a highlighter, picking out the most critical sentences exactly as they are written, and another that acts like a storyteller, reading the whole piece and explaining the main points in its own new words. By condensing long-form content into a brief, easy-to-read summary, it reduces your reading time by 60%, ensuring you stay informed without feeling overwhelmed by a wall of text.",
    keyTechs: "Python, PyTorch, Hugging Face Transformers",
    keyTechsIcon: Code2,
    metrics: "Trained on CNN/Daily Mail & XSum Datasets",
    metricsIcon: BookOpen,
    techStack: [
      "Python",
      "Hugging Face Transformers",
      "PyTorch",
      "NLTK",
      "spaCy",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "Jupyter Notebook",
      "VS Code",
    ],
    imageSrc: "/images/nlp-system.png",
    gradient: "bg-gradient-to-br from-pink-500/10 to-slate-100",
  },
  {
    id: "sentiment",
    name: "Sentiment Analyzer Chatbot",
    tag: "CONVERSATIONAL AI",
    categories: ["deepLearning", "nlp"] as ProjectCategory[],
    description:
      "An emotion-aware conversational agent utilizing RoBERTa fine-tuning to provide contextual responses based on real-time sentiment analysis of user input.",
    caseStudy:
      "The Emotionally Intelligent Bot: Sentiment-Aware Chatbot\n\nMost of us have had a frustrating experience with a chatbot that feels cold, robotic, and completely ignores our feelings. My Sentiment-Aware Chatbot was designed to bridge that gap by adding a layer of \"human empathy\" to digital conversations. It works by using two distinct AI \"brains\" simultaneously: the first brain acts as a therapist, analyzing your words to detect your current mood—whether you are stressed, happy, or sad. Once it understands your emotion, the second brain kicks in to craft a response that isn't just a generic answer, but a thoughtful, empathetic reply. If you tell the bot you're overwhelmed, it won't just give you a list of links; it will acknowledge your stress and offer a supportive word, making the interaction feel much more like talking to a real person.",
    keyTechs: "RoBERTa Large, FastAPI, React, WebSocket",
    keyTechsIcon: Code2,
    metrics: "Multi-class Sentiment Classification (7 Emotions)",
    metricsIcon: BarChart3,
    techStack: [
      "Python",
      "Hugging Face Transformers",
      "PyTorch",
      "RoBERTa",
      "T5",
      "NumPy",
      "Pandas",
      "NLTK",
      "scikit-learn",
      "Jupyter Notebook",
    ],
    imageSrc: "/images/conversational-ai.png",
    gradient: "bg-gradient-to-br from-cyan-500/10 to-slate-100",
  },
];

/** Left-panel image for project rows (used when a single project is shown with image + content). */
function ProjectImagePanel({
  tag,
  imageSrc,
  gradient,
}: {
  tag: string;
  imageSrc: string;
  gradient: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const useImage = !imageFailed;

  return (
    <div
      className={`relative flex min-h-[200px] w-full flex-col justify-between bg-cover bg-center p-4 md:min-h-[320px] md:max-w-[380px] ${!useImage ? gradient : ""}`}
      style={!useImage ? undefined : { backgroundColor: "rgb(244 247 251 / 0.8)" }}
    >
      {useImage && (
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          onError={() => setImageFailed(true)}
        />
      )}
      <span className="relative z-10 self-start rounded-lg border border-cyan-500/30 bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700 shadow-lg">
        {tag}
      </span>
      {!useImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-24 w-24 rounded-full border-2 border-cyan-500/40 bg-cyan-500/10" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F4F7FB]/90 via-white/30 to-transparent" aria-hidden />
    </div>
  );
}

/** Case study popup modal — words fade up with stagger */
function CaseStudyModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasCaseStudy = project.caseStudy && project.caseStudy.trim().length > 0;
  const paragraphs = hasCaseStudy ? project.caseStudy!.trim().split(/\n\n+/) : [];

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const words = container.querySelectorAll<HTMLElement>(".case-study-word");
    if (words.length === 0) return;
    const t = setTimeout(() => {
      gsap.from(words, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    }, 50);
    return () => clearTimeout(t);
  }, [project.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_0_48px_rgba(15,23,42,0.12)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 id="case-study-title" className="text-lg font-bold text-slate-900 md:text-xl">
              {project.name} — Case Study
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div
            ref={contentRef}
            className="overflow-y-auto px-5 py-4 max-h-[calc(85vh-4rem)]"
          >
            {paragraphs.length > 0 ? (
              <div className="readable-text space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {paragraphs.map((para, i) => {
                  const words = para.split(/\s+/).filter(Boolean);
                  return (
                    <p key={i}>
                      {words.map((word, wi) => (
                        <span key={`${i}-${wi}`} className="case-study-word inline-block pr-[0.25em]">
                          {word}
                        </span>
                      ))}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500">Case study content is not available.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectContentCard({
  project,
  isTechStackOpen,
  onTechStackToggle,
  onCaseStudyClick,
}: {
  project: (typeof projects)[0];
  isTechStackOpen: boolean;
  onTechStackToggle: () => void;
  onCaseStudyClick: () => void;
}) {
  const KeyTechsIcon = project.keyTechsIcon;
  const MetricsIcon = project.metricsIcon;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)] md:p-6">
      <div className="border-l-2 border-cyan-500/50 pl-3">
        <h3 className="text-lg font-bold text-slate-900 md:text-xl">
          {project.name}
        </h3>
      </div>
      <p className="readable-text mt-3 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>
      <div className="mt-4 space-y-2.5 rounded-xl bg-slate-50 py-2.5 pl-3 pr-3 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <KeyTechsIcon className="h-4 w-4 shrink-0 text-cyan-700" aria-hidden />
          <span>{project.keyTechs}</span>
        </div>
        <div className="flex items-center gap-2">
          <MetricsIcon className="h-4 w-4 shrink-0 text-cyan-700" aria-hidden />
          <span>{project.metrics}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCaseStudyClick}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_4px_14px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(6,182,212,0.45)]"
        >
          View Case Study
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onTechStackToggle}
          className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-700"
        >
          {isTechStackOpen ? "Hide Tech Stack" : "Tech Stack"}
        </button>
      </div>

      <AnimatePresence>
        {isTechStackOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                Full tech stack
              </p>
              <p className="readable-text mt-2 text-sm text-slate-600">
                {project.techStack.join(" · ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const emptyStateCopy: Record<FilterId, { title: string; subtitle: string }> = {
  all: { title: "No projects yet", subtitle: "Check back soon." },
  nlp: { title: "No projects in this category yet", subtitle: "Explore other categories." },
  computerVision: { title: "No projects in this category yet", subtitle: "Explore other categories." },
  generativeAI: { title: "No projects in this category yet", subtitle: "Explore other categories." },
  deepLearning: { title: "No projects in this category yet", subtitle: "Explore other categories." },
  edgeAI: { title: "No projects in this category yet", subtitle: "Explore other categories." },
};

function EmptyCategoryState({
  activeFilter,
  onViewAll,
}: {
  activeFilter: FilterId;
  onViewAll: () => void;
}) {
  const copy = emptyStateCopy[activeFilter];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 px-6 py-12 text-center md:px-10 md:py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-80" aria-hidden />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-700">
          Empty category
        </span>
        <div className="mt-6 flex justify-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <Code2 className="h-12 w-12 text-slate-500" aria-hidden />
          </div>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-slate-900 md:text-2xl">
          {copy.title}
        </h2>
        <p className="readable-text mx-auto mt-3 max-w-md text-sm text-slate-600 md:text-base">
          {copy.subtitle}
        </p>
        <button
          type="button"
          onClick={onViewAll}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-white px-4 py-2.5 text-sm font-medium text-cyan-700 transition-colors hover:border-cyan-500 hover:bg-cyan-500/10"
        >
          View all projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [techStackOpenId, setTechStackOpenId] = useState<string | null>(null);
  const [caseStudyProjectId, setCaseStudyProjectId] = useState<string | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  const caseStudyProject = caseStudyProjectId
    ? projects.find((p) => p.id === caseStudyProjectId)
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F4F7FB] text-slate-800">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.07)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/8 blur-3xl" />
      </div>

      <header className="relative border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <span className="inline-block rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
            Portfolio
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Advanced AI &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              ML Portfolio
            </span>
          </h1>
          <p className="readable-text mt-3 max-w-2xl text-base text-slate-600">
            Research-driven implementations in NLP, Computer Vision, Generative AI, and
            edge/on-device systems—from local code review to Indic voice automation.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.id
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_4px_14px_rgba(6,182,212,0.35)]"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-cyan-500/40 hover:bg-cyan-50 hover:text-cyan-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {filteredProjects.length === 0 ? (
          <EmptyCategoryState
            activeFilter={activeFilter}
            onViewAll={() => setActiveFilter("all")}
          />
        ) : (
          <div className="space-y-10">
            {filteredProjects.map((project, index) => {
              const imageOnRight = index % 2 === 1;
              return (
                <motion.section
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)] md:flex ${
                      imageOnRight ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <ProjectImagePanel
                      tag={project.tag}
                      imageSrc={project.imageSrc}
                      gradient={project.gradient}
                    />
                    <div className="flex-1 p-5 md:p-6">
                      <ProjectContentCard
                        project={project}
                        isTechStackOpen={techStackOpenId === project.id}
                        onTechStackToggle={() =>
                          setTechStackOpenId((prev) =>
                            prev === project.id ? null : project.id
                          )
                        }
                        onCaseStudyClick={() => setCaseStudyProjectId(project.id)}
                      />
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        )}
      </main>

      {caseStudyProject && (
        <CaseStudyModal
          project={caseStudyProject}
          onClose={() => setCaseStudyProjectId(null)}
        />
      )}
    </div>
  );
}
