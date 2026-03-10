"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header
      id="site-navbar"
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:py-4">
        <Link
          href="/"
          className="group flex items-baseline gap-2 transition-opacity hover:opacity-90"
        >
          <span
            className="relative text-[28px] font-semibold tracking-tight text-[#1F3C88] md:text-[36px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {content.brand}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#008080] transition-all duration-300 group-hover:w-full" aria-hidden />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {content.links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-[#008080] bg-teal-50"
                    : "text-[#1F3C88] hover:bg-slate-100 hover:text-[#008080]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#008080]" aria-hidden />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`h-0.5 w-6 rounded-full bg-[#1F3C88] transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-[#1F3C88] transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-[#1F3C88] transition-all duration-300 ${
              isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-slate-200/80 bg-slate-50/95 px-4 py-3 backdrop-blur-sm">
          {content.links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? "bg-teal-50 text-[#008080]" : "text-[#1F3C88] hover:bg-white hover:text-[#008080]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
