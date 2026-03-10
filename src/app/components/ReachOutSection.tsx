"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, Clock, LucideIcon } from "lucide-react";
import { getPublicJsonClient } from "@/lib/publicJsonClient";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  href: string;
}

type ContactLinks = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
};

type ReachOutContent = {
  title: string;
  subtitle: string;
};

function ContactCard({ icon: Icon, title, content, href }: ContactCardProps) {
  return (
    <a
      className="block p-4 sm:p-6 rounded-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-[#008080]/50 hover:scale-102 transition-all duration-300 ease-out shadow-[0_4px_14px_rgba(31,60,136,0.12)]"
      href={href}
      style={{
        background:
          "linear-gradient(135deg, rgba(75,0,130,0.4) 0%, rgba(31,60,136,0.3) 100%)",
      }}
    >
      <div className="flex flex-col">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-3 sm:mb-4" />
        <div className="text-white text-xs sm:text-sm font-semibold mb-2 leading-tight">
          {title}
        </div>
        <div className="text-white text-sm sm:text-base md:text-lg font-bold leading-tight break-words">
          {content}
        </div>
      </div>
    </a>
  );
}

export default function ReachOutSection() {
  const [links, setLinks] = useState<ContactLinks | null>(null);
  const [content, setContent] = useState<ReachOutContent | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [linksData, contentData] = await Promise.all([
          getPublicJsonClient<ContactLinks>("/content/contact-links.json"),
          getPublicJsonClient<ReachOutContent>("/content/reach-out-section.json"),
        ]);
        setLinks(linksData);
        setContent(contentData);
      } catch (err) {
        console.error("Failed to load reach-out content", err);
      }
    };
    load();
  }, []);

  if (!links || !content) {
    return null;
  }

  const contactMethods: ContactCardProps[] = [
    {
      icon: Phone,
      title: "CALL",
      content: links.phone,
      href: links.phoneHref,
    },
    {
      icon: Mail,
      title: "EMAIL",
      content: links.email,
      href: links.emailHref,
    },
    {
      icon: Clock,
      title: "COLLABORATE",
      content: "AI, cloud, or systems projects",
      href: "/contact",
    },
  ];

  return (
    <section
      id="reach-out"
      className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
          {content.title}
        </h2>
        <p className="mt-3 text-center text-sm text-slate-300 md:text-base">
          {content.subtitle}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {contactMethods.map((method, index) => (
            <ContactCard
              key={index}
              icon={method.icon}
              title={method.title}
              content={method.content}
              href={method.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
