"use client";

import { useEffect, useState } from "react";
import { getPublicJsonClient } from "@/lib/publicJsonClient";
import {
  PhoneIcon3D,
  MailIcon3D,
  ClockIcon3D,
  Icon3DWrapper,
} from "@/app/components/ContactIcons3D";

interface ContactCardProps {
  icon3D: React.ComponentType<{ className?: string }>;
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

function ContactCard({ icon3D: Icon3D, title, content, href }: ContactCardProps) {
  return (
    <a
      className="block rounded-[20px] border border-slate-200 bg-white/90 p-4 shadow-[0_4px_14px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 ease-out hover:scale-102 hover:border-teal-500/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-6"
      href={href}
    >
      <div className="flex flex-col">
        <Icon3DWrapper className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 sm:mb-4 sm:h-14 sm:w-14">
          <Icon3D className="h-6 w-6 text-cyan-700 sm:h-8 sm:w-8" />
        </Icon3DWrapper>
        <div className="mb-2 text-xs font-semibold leading-tight text-slate-500 sm:text-sm">
          {title}
        </div>
        <div className="break-words text-sm font-bold leading-tight text-slate-900 sm:text-base md:text-lg">
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
      icon3D: PhoneIcon3D,
      title: "CALL",
      content: links.phone,
      href: links.phoneHref,
    },
    {
      icon3D: MailIcon3D,
      title: "EMAIL",
      content: links.email,
      href: links.emailHref,
    },
    {
      icon3D: ClockIcon3D,
      title: "COLLABORATE",
      content: "AI, cloud, or systems projects",
      href: "/contact",
    },
  ];

  return (
    <section
      id="reach-out"
      className="bg-gradient-to-r from-[#F4F7FB] via-white to-[#F4F7FB] py-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {content.title}
        </h2>
        <p className="mt-3 text-center text-sm text-slate-600 md:text-base">
          {content.subtitle}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {contactMethods.map((method, index) => (
            <ContactCard
              key={index}
              icon3D={method.icon3D}
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
