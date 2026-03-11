"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Code2, BookOpen, Globe, BarChart3, Sparkles, ArrowRight, X } from "lucide-react";

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
    layout: "full" as const,
  },
  {
    id: "deepfake",
    name: "Deepfake Image Detection",
    tag: "COMPUTER VISION",
    category: "computerVision" as const,
    description:
      "High-precision classification model using Xception architecture to detect sophisticated AI-generated visual content and deepfake manipulations.",
    caseStudy:
      "The Fraud Detective: Deepfake Image Detection\n\nToday, it is becoming alarmingly easy for AI to create \"Deepfakes\"—fake images of people that look 100% real to the human eye. These can be used for scams, spreading misinformation, or identity theft. To fight this, I built a Deepfake Image Detection Model, which essentially serves as a high-tech \"digital detective.\" While a human might be fooled by a realistic-looking face, my model is trained to look at the microscopic pixel patterns and tiny inconsistencies that the human eye simply cannot see. By studying thousands of examples of both real and fake faces, it learns to spot the subtle \"digital fingerprints\" left behind by AI-generation tools, helping us verify what is real and what is a fabrication in our digital world.",
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
      <span className="relative z-10 self-start rounded-lg border border-cyan-400/25 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 shadow-lg">
        {tag}
      </span>
      {!useImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-24 w-24 rounded-full border-2 border-cyan-400/40 bg-cyan-500/10" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" aria-hidden />
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
      className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/30 bg-cover bg-center p-4 shadow-[0_0_24px_rgba(6,182,212,0.06)] md:min-h-[320px] ${!useImage ? gradient : ""}`}
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
      <span className="relative z-10 self-start rounded-lg border border-cyan-400/25 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 shadow-lg">
        {tag}
      </span>
      {!useImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-24 w-24 rounded-full border-2 border-cyan-400/40 bg-cyan-500/10" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" aria-hidden />
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
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" aria-hidden />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900 shadow-[0_0_48px_rgba(6,182,212,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-cyan-500/20 px-5 py-4">
            <h2 id="case-study-title" className="text-lg font-bold text-slate-50 md:text-xl">
              {project.name} — Case Study
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
              <div className="readable-text space-y-4 text-sm leading-relaxed text-slate-200 md:text-base">
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
              <p className="text-slate-400">Case study content is not available.</p>
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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 shadow-[0_0_24px_rgba(6,182,212,0.05)] transition-shadow hover:shadow-[0_0_36px_rgba(6,182,212,0.1)] md:p-6">
      <div className="border-l-2 border-cyan-500/50 pl-3">
        <h3 className="text-lg font-bold text-slate-50 md:text-xl">
          {project.name}
        </h3>
      </div>
      <p className="readable-text mt-3 text-sm leading-relaxed text-slate-300">
        {project.description}
      </p>
      <div className="mt-4 space-y-2.5 rounded-xl bg-slate-800/60 py-2.5 pl-3 pr-3 text-sm text-slate-200">
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
          onClick={onCaseStudyClick}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_4px_14px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(6,182,212,0.45)]"
        >
          View Case Study
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onTechStackToggle}
          className="inline-flex items-center rounded-xl border border-cyan-500/50 bg-slate-800/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
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
            <div className="mt-4 rounded-xl border border-cyan-500/20 bg-slate-800/80 px-4 py-3">
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
      className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/65 px-6 py-12 text-center md:px-10 md:py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-80" aria-hidden />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
          {isGenerative ? "Coming soon" : "Empty category"}
        </span>
        <div className="mt-6 flex justify-center">
          {copy.icon === "sparkles" ? (
            <div style={{ perspective: "400px", transformStyle: "preserve-3d" }}>
              <motion.div
                className="relative rounded-2xl border border-cyan-500/30 bg-slate-800/80 p-5"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 12px 40px rgba(6, 182, 212, 0.22), 0 0 0 1px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                animate={{
                  rotateY: [-14, 14, -14],
                  rotateX: [6, -4, 6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-12 w-12 text-cyan-400" aria-hidden />
              </motion.div>
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
  const [techStackOpenId, setTechStackOpenId] = useState<string | null>(null);
  const [caseStudyProjectId, setCaseStudyProjectId] = useState<string | null>(null);

  const summarizer = projects[0];
  const deepfake = projects[1];
  const sentiment = projects[2];
  const caseStudyProject = caseStudyProjectId ? projects.find((p) => p.id === caseStudyProjectId) : null;

  const isAllFilter = activeFilter === "all";
  const showSummarizer = isAllFilter || activeFilter === "nlp";
  const showDeepfake = isAllFilter || activeFilter === "computerVision";
  const showSentiment = isAllFilter || activeFilter === "deepLearning";
  const showRow2 = showDeepfake || isAllFilter;
  const showRow3 = showSentiment || isAllFilter;
  const hasAnyProjects = showSummarizer || showDeepfake || showSentiment;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950/90 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.07)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/8 blur-3xl" />
      </div>

      <header className="relative border-b border-slate-800/85 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <span className="inline-block rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Portfolio
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
            Advanced AI &amp; <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">ML Portfolio</span>
          </h1>
          <p className="readable-text mt-3 max-w-2xl text-base text-slate-400">
            Research-driven implementations in NLP, Computer Vision, and Generative AI.
            Deep learning meets human-centric systems.
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
                    : "border border-slate-600/90 bg-slate-800/50 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800/70 hover:text-cyan-300"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/75 shadow-[0_0_32px_rgba(6,182,212,0.06)] md:flex">
              <ProjectImagePanel
                tag={summarizer.tag}
                imageSrc="/images/nlp-system.png"
                gradient="bg-gradient-to-br from-pink-500/10 to-slate-900"
              />
              <div className="flex-1 p-5 md:p-6">
                <ProjectContentCard
                  project={summarizer}
                  isTechStackOpen={techStackOpenId === summarizer.id}
                  onTechStackToggle={() =>
                    setTechStackOpenId((prev) =>
                      prev === summarizer.id ? null : summarizer.id
                    )
                  }
                  onCaseStudyClick={() => setCaseStudyProjectId(summarizer.id)}
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Row 2: Deepfake – when Computer Vision only: image + content; when All: content | image */}
        {showRow2 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            {showDeepfake && !isAllFilter ? (
              <div className="overflow-hidden rounded-3xl border border-cyan-500/40 bg-slate-900/70 shadow-[0_0_40px_rgba(6,182,212,0.08)] md:flex">
                <ProjectImagePanel
                  tag={deepfake.tag}
                  imageSrc="/images/deepfake-detection.png"
                  gradient="bg-gradient-to-br from-violet-500/10 to-slate-900"
                />
                <div className="flex-1 p-5 md:p-6">
                  <ProjectContentCard
                    project={deepfake}
                    isTechStackOpen={techStackOpenId === deepfake.id}
                    onTechStackToggle={() =>
                      setTechStackOpenId((prev) =>
                        prev === deepfake.id ? null : deepfake.id
                      )
                    }
                    onCaseStudyClick={() => setCaseStudyProjectId(deepfake.id)}
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {showDeepfake && (
                  <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/60 shadow-[0_0_24px_rgba(6,182,212,0.05)]">
                    <ProjectContentCard
                      project={deepfake}
                      isTechStackOpen={techStackOpenId === deepfake.id}
                      onTechStackToggle={() =>
                        setTechStackOpenId((prev) =>
                          prev === deepfake.id ? null : deepfake.id
                        )
                      }
                      onCaseStudyClick={() => setCaseStudyProjectId(deepfake.id)}
                    />
                  </div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            {showSentiment && !isAllFilter ? (
              <div className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/75 shadow-[0_0_32px_rgba(6,182,212,0.06)] md:flex">
                <ProjectImagePanel
                  tag={sentiment.tag}
                  imageSrc="/images/conversational-ai.png"
                  gradient="bg-gradient-to-br from-cyan-500/10 to-slate-900"
                />
                <div className="flex-1 p-5 md:p-6">
                  <ProjectContentCard
                    project={sentiment}
                    isTechStackOpen={techStackOpenId === sentiment.id}
                    onTechStackToggle={() =>
                      setTechStackOpenId((prev) =>
                        prev === sentiment.id ? null : sentiment.id
                      )
                    }
                    onCaseStudyClick={() => setCaseStudyProjectId(sentiment.id)}
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
                  <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/60 shadow-[0_0_24px_rgba(6,182,212,0.05)]">
                    <ProjectContentCard
                      project={sentiment}
                      isTechStackOpen={techStackOpenId === sentiment.id}
                      onTechStackToggle={() =>
                        setTechStackOpenId((prev) =>
                          prev === sentiment.id ? null : sentiment.id
                        )
                      }
                      onCaseStudyClick={() => setCaseStudyProjectId(sentiment.id)}
                    />
                  </div>
                )}
              </div>
            )}
          </motion.section>
        )}

        {!hasAnyProjects && (
          <EmptyCategoryState activeFilter={activeFilter} onViewAll={() => setActiveFilter("all")} />
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
