import { CheckCircle } from "lucide-react";

export default function ServicesSection() {
  const services = [
    "BAIL HEARINGS",
    "11(b) APPLICATIONS",
    "PRELIMINARY HEARINGS",
    "TRIAL PROCEEDINGS",
    "MOTIONS",
    "GUILTY PLEAS",
    "APPEALS",
    "DISCOVERY PROCEEDINGS",
    "REASONS FOR SENTENCE",
    "REASONS FOR JUDGMENT",
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl w-full px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-[#1F3C88]">
          Transcription Services Provided
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#1F2937]">
          {services.map((s) => (
            <div
              key={s}
              className="p-6 bg-[#F9FAFB] rounded-[20px] shadow-[0_4px_14px_rgba(31,60,136,0.08)] flex items-center gap-4 border border-[#1F2937]/5"
            >
              <CheckCircle className="w-8 h-8 text-[#008080] flex-shrink-0" />
              <span className="text-lg font-medium text-[#1F3C88]">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
