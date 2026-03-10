"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BookOpen, Globe, BarChart3, Sparkles, ArrowRight } from "lucide-react";

const filters = [
  { id: "all", label: "All Projects" },
  { id: "nlp", label: "Natural Language Processing" },
  { id: "computerVision", label: "Computer Vision" },
  { id: "generativeAI", label: "Generative AI" },
  { id: "deepLearning", label: "Deep Learning" },
] as const;

type FilterId = (typeof filters)[number]["id"];

const projects = [
  {
    id: "ai-summarizer",
    name: "AI Text Summarizer",
    tag: "NLP SYSTEM",
    category: "nlp" as const,
    description:
      "An advanced NLP system implementing both extractive and abstractive summarization methods to process large-scale datasets with high semantic fidelity.",
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
    layout: "full" as const,
  },
  {
    id: "deepfake",
    name: "Deepfake Image Detection",
    tag: "COMPUTER VISION",
    category: "computerVision" as const,
    description:
      "High-precision classification model using Xception architecture to detect sophisticated AI-generated visual content and deepfake manipulations.",
    keyTechs: "TensorFlow, Keras, OpenCV, MTCNN",
    keyTechsIcon: Globe,
    metrics: "98.2% Accuracy on FaceForensics++ Dataset",
    metricsIcon: BarChart3,
    techStack: [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "scikit-learn",
      "Jupyter Notebook",
      "VS Code",
    ],
    layout: "content" as const,
  },
  {
    id: "sentiment",
    name: "Sentiment Analyzer Chatbot",
    tag: "CONVERSATIONAL AI",
    category: "deepLearning" as const,
    description:
      "An emotion-aware conversational agent utilizing RoBERTa fine-tuning to provide contextual responses based on real-time sentiment analysis of user input.",
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
    layout: "content" as const,
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
      style={
        useImage
          ? {
              backgroundImage: `url('${imageSrc}')`,
              backgroundColor: "rgb(15 23 42 / 0.5)",
            }
          : undefined
      }
    >
      <img
        src={imageSrc}
        alt=""
        className="sr-only"
        onError={() => setImageFailed(true)}
      />
      <span className="relative z-10 self-start rounded bg-slate-900/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
        {tag}
      </span>
      {!useImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="h-24 w-24 rounded-full border-2 border-cyan-400/50 bg-cyan-500/10" />
        </div>
      )}
      <div className="absolute inset-0 bg-slate-900/30" aria-hidden />
    </div>
  );
}

function ImagePlaceholderCard({
  tag,
  gradient,
  backgroundImage,
}: {
  tag: string;
  gradient: string;
  backgroundImage?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const useImage = backgroundImage && !imageFailed;

  return (
    <div
      className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/30 bg-cover bg-center p-4 md:min-h-[320px] ${!useImage ? gradient : ""}`}
      style={
        useImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundColor: "rgb(15 23 42 / 0.5)",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="sr-only"
          onError={() => setImageFailed(true)}
        />
      )}
      <span className="relative z-10 self-start rounded bg-slate-900/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
        {tag}
      </span>
      {!useImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="h-24 w-24 rounded-full border-2 border-cyan-400/50 bg-cyan-500/10" />
        </div>
      )}
    </div>
  );
}

function ProjectContentCard({
  project,
  isOpen,
  onToggle,
}: {
  project: (typeof projects)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const KeyTechsIcon = project.keyTechsIcon;
  const MetricsIcon = project.metricsIcon;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 md:p-6">
      <h3 className="text-lg font-semibold text-slate-50 md:text-xl">
        {project.name}
      </h3>
      <p className="readable-text mt-2 text-sm text-slate-300">
        {project.description}
      </p>
      <div className="mt-4 space-y-2 text-sm text-slate-200">
        <div className="flex items-center gap-2">
          <KeyTechsIcon className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
          <span>{project.keyTechs}</span>
        </div>
        <div className="flex items-center gap-2">
          <MetricsIcon className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
          <span>{project.metrics}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-400"
        >
          {isOpen ? "Hide Details" : "View Case Study"}
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center rounded-lg border border-cyan-500/60 bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400 hover:bg-slate-800/60"
        >
          Tech Stack
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Full tech stack
              </p>
              <p className="readable-text mt-2 text-sm text-slate-300">
                {project.techStack.join(" · ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const emptyStateCopy: Record<FilterId, { title: string; subtitle: string; icon: "sparkles" | "generic" }> = {
  all: { title: "No projects yet", subtitle: "Check back soon.", icon: "generic" },
  nlp: { title: "No projects in this category yet", subtitle: "Explore other categories.", icon: "generic" },
  computerVision: { title: "No projects in this category yet", subtitle: "Explore other categories.", icon: "generic" },
  generativeAI: {
    title: "Generative AI — In the works",
    subtitle: "Experiments with diffusion models, image generation, and LLM-based creative systems are in progress. This space will showcase them soon.",
    icon: "sparkles",
  },
  deepLearning: { title: "No projects in this category yet", subtitle: "Explore other categories.", icon: "generic" },
};

function EmptyCategoryState({
  activeFilter,
  onViewAll,
}: {
  activeFilter: FilterId;
  onViewAll: () => void;
}) {
  const copy = emptyStateCopy[activeFilter];
  const isGenerative = activeFilter === "generativeAI";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/60 px-6 py-12 text-center md:px-10 md:py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-80" aria-hidden />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
          {isGenerative ? "Coming soon" : "Empty category"}
        </span>
        <div className="mt-6 flex justify-center">
          {copy.icon === "sparkles" ? (
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-800/80 p-5">
              <Sparkles className="h-12 w-12 text-cyan-400" aria-hidden />
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-600/50 bg-slate-800/60 p-5">
              <Code2 className="h-12 w-12 text-slate-400" aria-hidden />
            </div>
          )}
        </div>
        <h2 className="mt-6 text-xl font-semibold text-slate-100 md:text-2xl">
          {copy.title}
        </h2>
        <p className="readable-text mx-auto mt-3 max-w-md text-sm text-slate-400 md:text-base">
          {copy.subtitle}
        </p>
        <button
          type="button"
          onClick={onViewAll}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-transparent px-4 py-2.5 text-sm font-medium text-cyan-300 transition-colors hover:border-cyan-400 hover:bg-cyan-500/10"
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
  const [openId, setOpenId] = useState<string | null>(null);

  const summarizer = projects[0];
  const deepfake = projects[1];
  const sentiment = projects[2];

  const isAllFilter = activeFilter === "all";
  const showSummarizer = isAllFilter || activeFilter === "nlp";
  const showDeepfake = isAllFilter || activeFilter === "computerVision";
  const showSentiment = isAllFilter || activeFilter === "deepLearning";
  const showRow2 = showDeepfake || isAllFilter;
  const showRow3 = showSentiment || isAllFilter;
  const hasAnyProjects = showSummarizer || showDeepfake || showSentiment;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <header className="relative border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Advanced AI &amp; <span className="text-cyan-400">ML Portfolio</span>
          </h1>
          <p className="readable-text mt-3 max-w-2xl text-base text-slate-300">
            Showcasing research-driven implementations in NLP, Computer Vision, and Generative AI.
            Exploring the intersection of deep learning and human-centric systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === f.id
                    ? "bg-cyan-500 text-slate-950"
                    : "border border-cyan-500/50 bg-transparent text-slate-200 hover:border-cyan-400 hover:bg-slate-800/60"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Row 1: AI Text Summarizer - full width with image left, content right */}
        {showSummarizer && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/80 md:flex">
              <ProjectImagePanel
                tag={summarizer.tag}
                imageSrc="/images/nlp-system.png"
                gradient="bg-gradient-to-br from-pink-500/10 to-slate-900"
              />
              <div className="flex-1 p-5 md:p-6">
                <ProjectContentCard
                  project={summarizer}
                  isOpen={openId === summarizer.id}
                  onToggle={() =>
                    setOpenId((prev) =>
                      prev === summarizer.id ? null : summarizer.id
                    )
                  }
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Row 2: Deepfake – when Computer Vision only: image + content; when All: content | image */}
        {showRow2 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {showDeepfake && !isAllFilter ? (
              <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/80 md:flex">
                <ProjectImagePanel
                  tag={deepfake.tag}
                  imageSrc="/images/deepfake-detection.png"
                  gradient="bg-gradient-to-br from-violet-500/10 to-slate-900"
                />
                <div className="flex-1 p-5 md:p-6">
                  <ProjectContentCard
                    project={deepfake}
                    isOpen={openId === deepfake.id}
                    onToggle={() =>
                      setOpenId((prev) =>
                        prev === deepfake.id ? null : deepfake.id
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {showDeepfake && (
                  <ProjectContentCard
                    project={deepfake}
                    isOpen={openId === deepfake.id}
                    onToggle={() =>
                      setOpenId((prev) =>
                        prev === deepfake.id ? null : deepfake.id
                      )
                    }
                  />
                )}
                {isAllFilter && (
                  <ImagePlaceholderCard
                    tag="COMPUTER VISION"
                    gradient="bg-gradient-to-br from-violet-500/10 to-slate-900"
                    backgroundImage="/images/deepfake-detection.png"
                  />
                )}
              </div>
            )}
          </motion.section>
        )}

        {/* Row 3: Sentiment – when Deep Learning only: image + content; when All: image | content */}
        {showRow3 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {showSentiment && !isAllFilter ? (
              <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/80 md:flex">
                <ProjectImagePanel
                  tag={sentiment.tag}
                  imageSrc="/images/conversational-ai.png"
                  gradient="bg-gradient-to-br from-cyan-500/10 to-slate-900"
                />
                <div className="flex-1 p-5 md:p-6">
                  <ProjectContentCard
                    project={sentiment}
                    isOpen={openId === sentiment.id}
                    onToggle={() =>
                      setOpenId((prev) =>
                        prev === sentiment.id ? null : sentiment.id
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {isAllFilter && (
                  <ImagePlaceholderCard
                    tag="CONVERSATIONAL AI"
                    gradient="bg-gradient-to-br from-cyan-500/10 to-slate-900"
                    backgroundImage="/images/conversational-ai.png"
                  />
                )}
                {showSentiment && (
                  <ProjectContentCard
                    project={sentiment}
                    isOpen={openId === sentiment.id}
                    onToggle={() =>
                      setOpenId((prev) =>
                        prev === sentiment.id ? null : sentiment.id
                      )
                    }
                  />
                )}
              </div>
            )}
          </motion.section>
        )}

        {!hasAnyProjects && (
          <EmptyCategoryState activeFilter={activeFilter} onViewAll={() => setActiveFilter("all")} />
        )}
      </main>
    </div>
  );
}
