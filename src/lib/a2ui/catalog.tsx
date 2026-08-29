"use client";

import Link from "next/link";
import { createCatalog, type CatalogDefinitions } from "@copilotkit/a2ui-renderer";
import type { z } from "zod/v3";
import { a2uiDefinitions } from "./definitions";

type CatalogProps<K extends keyof typeof a2uiDefinitions> = z.infer<
  (typeof a2uiDefinitions)[K]["props"]
>;

export const portfolioA2UICatalog = createCatalog(
  a2uiDefinitions as unknown as CatalogDefinitions,
  {
    ProjectCard: ({ props }) => {
      const card = props as CatalogProps<"ProjectCard">;
      const tags = card.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean);
      const href = card.href || "/projects";
      const isInternal = href.startsWith("/");
      const className =
        "block rounded-[1.25rem] border border-black/10 bg-[#efece3] p-3.5 transition hover:-translate-y-0.5 hover:border-black/20";
      const body = (
        <>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Selected work
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-outfit)] text-base font-semibold tracking-tight text-neutral-950">
            {card.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{card.blurb}</p>
          {tags.length > 0 ? (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#E8FF47] px-2 py-0.5 text-[10px] font-medium lowercase tracking-wide text-neutral-950"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </>
      );

      if (isInternal) {
        return (
          <Link href={href} className={className}>
            {body}
          </Link>
        );
      }

      return (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {body}
        </a>
      );
    },
    JourneyBeat: ({ props }) => {
      const beat = props as CatalogProps<"JourneyBeat">;
      return (
        <div className="rounded-[1.25rem] border border-black/10 bg-[#efece3] p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            {beat.year}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-outfit)] text-base font-semibold text-neutral-950">
            {beat.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{beat.summary}</p>
        </div>
      );
    },
    ServicePlan: ({ props }) => {
      const plan = props as CatalogProps<"ServicePlan">;
      return (
        <div className="rounded-[1.25rem] border border-black/10 bg-[#efece3] p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-neutral-950">
              {plan.name}
            </h3>
            <span className="text-xs font-medium text-neutral-500">{plan.price}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">{plan.description}</p>
        </div>
      );
    },
    ContactCta: ({ props }) => {
      const cta = props as CatalogProps<"ContactCta">;
      const isInternal = cta.href.startsWith("/");
      const className =
        "inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-[#E8FF47] transition hover:bg-neutral-800";
      if (isInternal) {
        return (
          <Link href={cta.href} className={className}>
            {cta.label}
          </Link>
        );
      }
      return (
        <a href={cta.href} className={className}>
          {cta.label}
        </a>
      );
    },
  },
  {
    catalogId: "portfolio-a2ui",
    includeBasicCatalog: true,
  },
);
