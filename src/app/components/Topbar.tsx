import { getPublicJson } from "@/lib/publicJson";

type TopbarContent = {
  services: string[];
};

type ContactLinks = {
  phone: string;
  phoneHref: string;
};

async function readTopbarContent(): Promise<TopbarContent> {
  return getPublicJson<TopbarContent>("/content/topbar.json", 180);
}

async function readContactLinks(): Promise<ContactLinks> {
  return getPublicJson<ContactLinks>("/content/contact-links.json", 300);
}

export default async function Topbar() {
  const [content, contact] = await Promise.all([
    readTopbarContent(),
    readContactLinks(),
  ]);
  return (
    <div id="site-topbar" className="bg-[#1F3C88] border-b border-[#183370]">
      <div className="mx-auto max-w-7xl w-full px-4 flex items-center justify-between text-xs text-white">
        <a
          href={contact.phoneHref}
          className="text-white text-xl font-bold flex items-center gap-2 hover:text-cyan-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-phone-icon lucide-phone"
          >
            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
          </svg>
          {contact.phone}
        </a>
        <div className="overflow-hidden w-full max-w-md bg-[#4B0082] p-2 py-3 text-center text-xl h-full rounded-r-[12px]">
          <div className="topbar-text-container">
            {content.services.map((service, idx) => (
              <div key={`${service}-${idx}`} className="topbar-text-item">
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
