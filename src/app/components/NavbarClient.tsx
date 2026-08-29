"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarLink = {
  label: string;
  href: string;
};

type NavbarContent = {
  brand: string;
  links: NavbarLink[];
  cta?: { label: string; href: string };
};

interface NavbarClientProps {
  content: NavbarContent;
}

const LIME = "#E8FF47";

export default function NavbarClient({ content }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Home uses the heynesh sticky sidebar — hide the global top nav.
  if (isHome) return null;

  return (
    <header
      id="site-navbar"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-[#DED8C9]/92 backdrop-blur-xl"
          : "border-b border-transparent bg-[#DED8C9]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold tracking-tight text-neutral-950 transition md:text-base"
        >
          {content.brand}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {content.links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && !link.href.includes("#") && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium lowercase tracking-wide transition ${
                  isActive
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-700 hover:bg-black/5 hover:text-neutral-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {content.cta ? (
            <Link
              href={content.cta.href}
              className="hidden items-center rounded-xl px-4 py-2 text-xs font-bold text-neutral-950 transition hover:brightness-95 sm:inline-flex"
              style={{ backgroundColor: LIME }}
            >
              {content.cta.label}
            </Link>
          ) : null}

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-black/15 bg-white/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block h-0.5 w-4 rounded-full bg-neutral-900 transition ${
                isMobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded-full bg-neutral-900 transition ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded-full bg-neutral-900 transition ${
                isMobileMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-black/10 bg-[#DED8C9] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {content.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-medium lowercase text-neutral-700 transition hover:bg-black/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {content.cta ? (
            <Link
              href={content.cta.href}
              className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold text-neutral-950"
              style={{ backgroundColor: LIME }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {content.cta.label}
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
