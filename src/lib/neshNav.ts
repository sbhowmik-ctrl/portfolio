import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  Briefcase,
  Radar,
  Layers,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export type NeshNavSide = "left" | "right" | null;

export type NeshNavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Hero side placement; null = sidebar-only */
  side: NeshNavSide;
};

export const NESH_NAV: NeshNavItem[] = [
  { id: "home", label: "Home", href: "#top", icon: Home, side: "left" },
  { id: "journey", label: "About me", href: "#journey", icon: User, side: "left" },
  { id: "work", label: "Projects", href: "#work", icon: Briefcase, side: "left" },
  { id: "skills", label: "Skills", href: "#skills", icon: Radar, side: "right" },
  {
    id: "capabilities",
    label: "What you get",
    href: "#capabilities",
    icon: Layers,
    side: null,
  },
  { id: "services", label: "Services", href: "#services", icon: Sparkles, side: "right" },
  { id: "faq", label: "Faq", href: "#faq", icon: HelpCircle, side: "right" },
];

export const NESH_NAV_LEFT = NESH_NAV.filter((i) => i.side === "left");
export const NESH_NAV_RIGHT = NESH_NAV.filter((i) => i.side === "right");

export const NESH_NAV_LAYOUT_TRANSITION = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export function neshNavLayoutId(id: string) {
  return `nesh-nav-${id}`;
}
