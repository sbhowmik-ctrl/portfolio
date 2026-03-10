import Link from "next/link";
import { Facebook, LinkedinIcon, Instagram } from "lucide-react";
import { getPublicJson } from "@/lib/publicJson";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
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

export default async function Footer() {
  const links = await getPublicJson<ContactLinks>("/content/contact-links.json", 300);

  const socialLinks = [
    { icon: Facebook, href: links.facebookUrl, label: "Facebook" },
    { icon: LinkedinIcon, href: links.linkedinUrl, label: "LinkedIn" },
    { icon: Instagram, href: links.instagramUrl, label: "Instagram" },
  ];
  return (
    <footer className="bg-[#0B0C10] text-white">
      <div className="mx-auto max-w-7xl w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About & Copyright/Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-lg font-bold text-[#008080]">
              Sanradhya Bhowmik
            </h3>
            <p className="text-sm text-[#4B5563] text-center md:text-left">
              AI &amp; Systems Engineer working across intelligent pipelines, decentralized architecture, and
              cloud infrastructure.
            </p>
            <div className="text-xs text-white/70">
              © {new Date().getFullYear()} Sanradhya Bhowmik.
            </div>
            
            {/* Follow Us */}
            <div className="flex flex-col items-center md:items-start gap-3 mt-2">
              <h4 className="text-sm font-semibold text-[#008080]">Follow On </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#008080] transition-colors p-2 border border-white/30 rounded-full hover:border-[#008080] hover:scale-110 transform duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-lg font-bold text-[#008080]">Quick Links</h3>
            <nav className="flex flex-col items-center md:items-start gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/90 hover:text-[#008080] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/privacy"
                className="text-sm text-white/90 hover:text-[#008080] transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-lg font-bold text-[#008080]">Contact</h3>
            <div className="flex flex-col items-center md:items-start gap-2 text-sm">
              <a 
                href={links.phoneHref}
                className="text-white/90 hover:text-[#008080] transition-colors"
              >
                {links.phone}
              </a>
              <a 
                href={links.emailHref}
                className="text-white/90 hover:text-[#008080] transition-colors"
              >
                {links.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
