"use client";

import Link from "next/link";
import { Facebook, LinkedinIcon, Instagram } from "lucide-react";

const quickLinks = [
  { label: "home", href: "/" },
  { label: "about me", href: "/#journey" },
  { label: "projects", href: "/#work" },
  { label: "services", href: "/#services" },
  { label: "faq", href: "/#faq" },
  { label: "contact", href: "/contact" },
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

export default function FooterClient({ links }: { links: ContactLinks }) {
  const socialLinks = [
    { icon: Facebook, href: links.facebookUrl, label: "Facebook" },
    { icon: LinkedinIcon, href: links.linkedinUrl, label: "LinkedIn" },
    { icon: Instagram, href: links.instagramUrl, label: "Instagram" },
  ];

  return (
    <footer className="border-t border-black/10 bg-[#D2CCC0] text-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 lg:px-12">
        <div>
          <Link
            href="/"
            className="font-[family-name:var(--font-outfit)] text-lg font-semibold tracking-tight text-neutral-950"
          >
            Sanradhya Bhowmik
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
            AI &amp; Systems Engineer building intelligent pipelines, edge experiences, and production-minded infrastructure.
          </p>
          <p className="mt-6 text-xs text-neutral-500">
            © {new Date().getFullYear()} — Sanradhya Bhowmik
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Navigate
          </h3>
          <nav className="mt-4 flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm lowercase text-neutral-700 transition hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Contact
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={links.phoneHref} className="text-neutral-700 transition hover:text-neutral-950">
              {links.phone}
            </a>
            <a href={links.emailHref} className="text-neutral-700 transition hover:text-neutral-950">
              {links.email}
            </a>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
