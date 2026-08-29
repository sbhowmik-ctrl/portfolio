import { getPublicJson } from "@/lib/publicJson";
import NavbarClient from "./NavbarClient";

type NavbarLink = {
  label: string;
  href: string;
};

type NavbarContent = {
  brand: string;
  links: NavbarLink[];
  cta?: { label: string; href: string };
};

async function readNavbarContent(): Promise<NavbarContent> {
  return getPublicJson<NavbarContent>("/content/navbar.json", 300);
}

export default async function Navbar() {
  const content = await readNavbarContent();
  return <NavbarClient content={content} />;
}
