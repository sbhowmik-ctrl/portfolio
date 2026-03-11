"use client";

import {
  Facebook,
  Loader2,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import {
  PhoneIcon3D,
  MailIcon3D,
  ShareIcon3D,
  Icon3DWrapper,
} from "@/app/components/ContactIcons3D";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ReachOutSection from "@/app/components/ReachOutSection";
import ContactPage3DBackground from "@/app/components/ContactPage3DBackground";

interface ContactInfoItem {
  icon: string;
  title: string;
  content?: string;
  socialLinks?: Array<{
    icon: string;
    href: string;
    ariaLabel: string;
  }>;
}

interface ContactPageContent {
  header: {
    title: string;
  };
  sectionHeader: {
    title: string;
  };
  contactInfo: ContactInfoItem[];
}

interface ContactLinksContent {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export default function ContactPage() {
  const [content, setContent] = useState<ContactPageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Message sent! We've received your enquiry and will get back soon.");
        setFormData({ fullName: "", phone: "", email: "", comments: "" });
      } else {
        toast.error(result.message || "Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const [pageRes, linksRes] = await Promise.all([
        fetch("/content/contact-page.json"),
        fetch("/content/contact-links.json"),
      ]);
      const pageData: ContactPageContent = await pageRes.json();
      const links: ContactLinksContent = await linksRes.json();

      const mergedContactInfo = pageData.contactInfo.map((item) => {
        if (item.icon === "Phone") {
          return { ...item, content: links.phone };
        }
        if (item.icon === "Mail") {
          return { ...item, content: links.email };
        }
        if (item.icon === "Share2" && item.socialLinks) {
          return {
            ...item,
            socialLinks: [
              { icon: "Facebook", href: links.facebookUrl, ariaLabel: "Facebook" },
              { icon: "Linkedin", href: links.linkedinUrl, ariaLabel: "LinkedIn" },
              { icon: "Instagram", href: links.instagramUrl, ariaLabel: "Instagram" },
            ],
          };
        }
        return item;
      });

      setContent({ ...pageData, contactInfo: mergedContactInfo });
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (!content || loading) {
    return (
      <div className="min-h-screen bg-slate-950/90 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          <p className="text-lg text-slate-200 font-alice">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="holographic-bg relative min-h-screen bg-slate-950/90 text-slate-100">
      {/* 3D elements that move with cursor - contact page only */}
      <ContactPage3DBackground />
      {/* Full-height hero + contact block */}
      <div className="relative flex min-h-[calc(100vh-var(--navbar-height,0px))] flex-col">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15)_0%,transparent_50%)]" />
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
            <motion.h1
              className="text-3xl font-semibold text-center text-slate-50 md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.header.title}
            </motion.h1>
            <motion.p
              className="readable-text mt-4 text-center text-base text-slate-300 md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              If you&apos;re interested in AI systems, scalable cloud deployments, or innovative tech collaboration — let&apos;s connect.
            </motion.p>
          </div>
        </div>

        {/* Section label */}
        <div className="relative mx-auto w-full max-w-5xl px-4 pt-8">
          <motion.p
            className="text-center text-sm font-medium uppercase tracking-widest text-cyan-400/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {content.sectionHeader.title}
          </motion.p>
        </div>

        {/* Contact cards - fill remaining space creatively */}
        <div className="relative flex-1 px-4 pb-12 pt-6 md:pb-16 md:pt-8">
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.contactInfo.map((item, index) => {
              const Icon3D =
                item.icon === "Phone"
                  ? PhoneIcon3D
                  : item.icon === "Mail"
                    ? MailIcon3D
                    : item.icon === "Share2"
                      ? ShareIcon3D
                      : PhoneIcon3D;

              const isLink =
                item.icon === "Mail" ||
                item.icon === "Phone" ||
                (item.icon === "Share2" && item.socialLinks?.length);

              const href =
                item.icon === "Mail" && item.content
                  ? `mailto:${item.content}`
                  : item.icon === "Phone" && item.content
                    ? `tel:${item.content.replace(/\s/g, "")}`
                    : undefined;

              const cardContent = (
                <>
                  <Icon3DWrapper className="h-14 w-14 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 transition-colors group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20">
                    <Icon3D className="h-7 w-7 shrink-0 text-cyan-400" aria-hidden />
                  </Icon3DWrapper>
                  <h3 className="mt-4 text-lg font-semibold text-slate-100">
                    {item.title}
                  </h3>
                  {item.content && (
                    <p className="mt-2 text-slate-300 md:text-lg">
                      {item.content}
                    </p>
                  )}
                  {item.socialLinks && item.socialLinks.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {item.socialLinks.map((social, socialIndex) => {
                        const SocialIcon =
                          social.icon === "Facebook"
                            ? Facebook
                            : social.icon === "Linkedin"
                              ? Linkedin
                              : social.icon === "Instagram"
                                ? Instagram
                                : Facebook;
                        return (
                          <a
                            key={socialIndex}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/60 text-slate-300 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                            aria-label={social.ariaLabel}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <SocialIcon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {isLink && (item.icon === "Mail" || item.icon === "Phone") && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400">
                      Reach out
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  )}
                </>
              );

              const sharedClasses =
                "group relative flex min-h-[220px] flex-col rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-lg transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-500/10 hover:shadow-xl md:min-h-[260px] md:p-7";

              if (href && (item.icon === "Mail" || item.icon === "Phone")) {
                return (
                  <a
                    key={index}
                    href={href}
                    className={`${sharedClasses} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950`}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={index} className={sharedClasses}>
                  {cardContent}
                </div>
              );
            })}
          </motion.div>

          {/* Enquiry form - highlighted card */}
          <motion.section
            className="relative mx-auto mt-12 w-full max-w-2xl md:mt-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Outer glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-cyan-500/30 via-teal-500/20 to-cyan-500/30 opacity-80 blur-sm" aria-hidden />
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/40 via-transparent to-teal-500/40 opacity-60" aria-hidden />

            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-slate-900/90 p-6 shadow-[0_0_40px_rgba(6,182,212,0.15),0_25px_50px_-12px_rgba(0,0,0,0.5)] md:p-10">
              {/* Top accent strip */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90" aria-hidden />

              <div className="text-center">
                <span className="inline-block rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Get in touch
                </span>
                <h2 className="mt-4 text-2xl font-bold text-slate-50 md:text-3xl">
                  Send an enquiry
                </h2>
                <p className="mt-2 text-sm text-slate-400 md:text-base">
                  Fill in your details and we&apos;ll get back to you soon.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                aria-busy={submitting}
                aria-label="Send an enquiry"
              >
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-300">
                    Name <span className="text-cyan-400" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus-visible:ring-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-slate-300">
                    Contact number <span className="text-cyan-400" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus-visible:ring-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-300">
                    Email <span className="text-cyan-400" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus-visible:ring-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="contact-comments" className="mb-2 block text-sm font-medium text-slate-300">
                    Your message
                  </label>
                  <textarea
                    id="contact-comments"
                    name="comments"
                    rows={4}
                    value={formData.comments}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Share a bit about what you’d like to discuss…"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus-visible:ring-cyan-400"
                  />
                </div>
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-4 px-6 font-bold text-slate-950 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all hover:from-cyan-400 hover:to-teal-400 hover:shadow-[0_6px_28px_rgba(6,182,212,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-[0_4px_20px_rgba(6,182,212,0.4)]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                        <span>Sending…</span>
                      </>
                    ) : (
                      "Submit enquiry"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        </div>
      </div>

      <ReachOutSection />
    </div>
  );
}
