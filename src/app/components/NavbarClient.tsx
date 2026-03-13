"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

type NavbarLink = {
  label: string;
  href: string;
};

type NavbarContent = {
  brand: string;
  links: NavbarLink[];
};

interface NavbarClientProps {
  content: NavbarContent;
}

export default function NavbarClient({ content }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const brandTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = brandTextRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".spotlight-char");
    if (chars.length === 0) return;
    gsap.from(chars, {
      opacity: 0.1,
      scale: 0.8,
      filter: "blur(4px)",
      stagger: { each: 0.06, from: "center" },
      duration: 0.4,
      ease: "power2.out",
    });
  }, [content.brand]);

  const glassBar =
    "border border-white/30 bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_4px_24px_rgba(0,0,0,0.12),0_12px_40px_-8px_rgba(0,0,0,0.2)] backdrop-blur-2xl";
  const glassPill =
    "border border-white/25 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset] backdrop-blur-xl";

  return (
    <header id="site-navbar" className="sticky top-4 z-50 w-full px-3 sm:px-5">
      {/* Slim floating pill: curved */}
      <div className="relative mx-auto max-w-5xl">
        <div
          className={`absolute inset-0 rounded-full ${glassBar}`}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)",
          }}
        />
        <div className="relative flex items-center justify-between px-5 py-2.5 md:px-8 md:py-3">
        <Link
          href="/"
          className="group relative z-10 flex items-baseline rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <h3
            ref={brandTextRef}
            className="text spotlight-reveal text-[18px] font-semibold tracking-tight text-slate-100 drop-shadow-md transition-colors group-hover:text-cyan-400 md:text-[22px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {content.brand.split("").map((char, i) => (
              <span
                key={`${content.brand}-${i}`}
                className="spotlight-char inline-block"
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h3>
        </Link>

        {/* Desktop: nav in a crystal pill */}
        <nav className="relative z-10 hidden items-center md:flex">
          <div
            className={`flex items-center gap-0.5 rounded-full px-1 py-1 ${glassPill}`}
          >
            {content.links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                    isActive
                      ? "bg-white/25 text-cyan-400 shadow-sm"
                      : "text-slate-200 hover:bg-white/20 hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile menu button - crystal style, slim */}
        <button
          type="button"
          className={`relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${glassPill}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-slate-200 transition-all duration-200 ${
              isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-slate-200 transition-all duration-200 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-slate-200 transition-all duration-200 ${
              isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </div>

      {/* Mobile dropdown - crystal glass, curved bottom */}
      <div
        className={`relative mx-auto max-w-5xl overflow-hidden transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`mx-3 -mt-0.5 rounded-b-[2rem] border border-t-0 border-white/20 ${glassBar} sm:mx-4`}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 100%)",
          }}
        >
          <nav className="flex flex-col gap-0.5 px-5 py-3">
            {content.links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-2.5 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                    isActive
                      ? "bg-white/25 text-cyan-400"
                      : "text-slate-200 hover:bg-white/20 hover:text-cyan-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
