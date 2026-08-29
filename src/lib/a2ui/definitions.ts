import { z } from "zod/v3";

export const a2uiDefinitions = {
  ProjectCard: {
    description:
      "A selected-work project card with name, short blurb, comma-separated tags, and an optional internal or external link.",
    props: z.object({
      name: z.string(),
      blurb: z.string(),
      tags: z.string().describe("Comma-separated tags such as On-device, NLP, Vision"),
      href: z.string().optional(),
    }),
  },
  JourneyBeat: {
    description: "A single beat from Sanradhya's career journey timeline.",
    props: z.object({
      year: z.string(),
      title: z.string(),
      summary: z.string(),
    }),
  },
  ServicePlan: {
    description: "An engagement option (review, scoped build, or iteration).",
    props: z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
    }),
  },
  ContactCta: {
    description: "A prominent call-to-action that links to contact, email, GitHub, or LinkedIn.",
    props: z.object({
      label: z.string(),
      href: z.string(),
    }),
  },
};
