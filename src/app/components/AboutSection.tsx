export default function AboutSection() {
  return (
    <section id="about" className="bg-slate-950 py-12 text-slate-100 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
            About Sanradhya
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            An AI &amp; systems engineer focused on building reliable data pipelines, interpretable models,
            and cloud-aware deployments that hold up in production.
          </p>
        </div>
        <div className="flex-1 space-y-3 text-sm text-slate-200 md:text-[0.95rem]">
          <p>
            From classical ML algorithms to modern deep learning, I have worked across the stack:
            cleaning data, designing features, training models, and deploying services. Each project is
            treated as a complete system, not just a model.
          </p>
          <p>
            Recent work includes an AI-based meeting summary generator with real-time ingestion and
            summarization, as well as ML models built from scratch to deeply understand optimization,
            loss landscapes, and evaluation metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
