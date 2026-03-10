import { getPublicJson } from "@/lib/publicJson";

type ContactLinks = {
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
  githubHandle: string;
  githubUrl: string;
};

export default async function ContactSection() {
  const links = await getPublicJson<ContactLinks>("/content/contact-links.json", 300);

  return (
    <section id="get-in-touch" className="bg-slate-950 py-10 text-slate-100 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Let’s Build Intelligent Systems Together
        </h2>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          If you’re interested in AI systems, scalable cloud deployments, or innovative tech collaboration —
          let’s connect.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2 text-sm text-slate-200">
          <a href={links.emailHref} className="hover:text-cyan-300 transition-colors">
            📧 Email: {links.email}
          </a>
          <a href={links.phoneHref} className="hover:text-cyan-300 transition-colors">
            📱 Phone: {links.phone}
          </a>
          <a href={links.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">
            🌐 GitHub: {links.githubHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
