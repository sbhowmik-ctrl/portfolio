import { getPublicJson } from "@/lib/publicJson";
import FooterClient from "./FooterClient";

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
  return <FooterClient links={links} />;
}
