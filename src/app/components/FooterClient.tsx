"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { Facebook, LinkedinIcon, Instagram } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

type ContactLinks = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
};

const MOVE_AMOUNT = 12;

function useCursorFollow() {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      setTransform({
        x: x * MOVE_AMOUNT,
        y: y * MOVE_AMOUNT,
      });
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setTransform({ x: 0, y: 0 });
  }, []);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}

function FooterCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, transform, handleMouseMove, handleMouseLeave } = useCursorFollow();

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-visible"
    >
      <div
        className={`${className ?? ""}`}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function FooterClient({ links }: { links: ContactLinks }) {
  const socialLinks = [
    { icon: Facebook, href: links.facebookUrl, label: "Facebook" },
    { icon: LinkedinIcon, href: links.linkedinUrl, label: "LinkedIn" },
    { icon: Instagram, href: links.instagramUrl, label: "Instagram" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0B0C10] text-white">
      <div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-0 h-24 w-3/4 -translate-x-1/2 bg-cyan-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.4)_0%,transparent_50%)]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 h-64 w-96 bg-teal-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl w-full px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <FooterCard className="flex flex-col items-center md:items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-cyan-500/20 md:p-7">
            <Link
              href="/"
              className="rounded-md text-xl font-bold tracking-tight text-[#008080] transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10]"
            >
              Sanradhya Bhowmik
            </Link>
            <p className="text-sm leading-relaxed text-slate-300 text-center md:text-left">
              AI &amp; Systems Engineer working across intelligent pipelines, decentralized architecture, and
              cloud infrastructure.
            </p>
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} Sanradhya Bhowmik.
            </div>
            <div className="flex flex-col items-center md:items-start gap-3 pt-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90">
                Follow On
              </h4>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10]"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </FooterCard>

          <FooterCard className="flex flex-col items-center md:items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-cyan-500/20 md:p-7">
            <h3 className="text-lg font-bold text-[#008080] after:mt-2 after:block after:h-0.5 after:w-10 after:rounded-full after:bg-cyan-500/60 after:content-['']">
              Quick Links
            </h3>
            <nav className="flex flex-col items-center md:items-start gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md text-sm text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10] focus-visible:text-cyan-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </FooterCard>

          <FooterCard className="flex flex-col items-center md:items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-cyan-500/20 md:p-7">
            <h3 className="text-lg font-bold text-[#008080] after:mt-2 after:block after:h-0.5 after:w-10 after:rounded-full after:bg-cyan-500/60 after:content-['']">
              Contact
            </h3>
            <div className="flex flex-col items-center md:items-start gap-3 text-sm">
              <a
                href={links.phoneHref}
                className="rounded-md text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:underline hover:underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10] focus-visible:text-cyan-400"
              >
                {links.phone}
              </a>
              <a
                href={links.emailHref}
                className="rounded-md text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:underline hover:underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10] focus-visible:text-cyan-400"
              >
                {links.email}
              </a>
            </div>
          </FooterCard>
        </div>
      </div>
    </footer>
  );
}
