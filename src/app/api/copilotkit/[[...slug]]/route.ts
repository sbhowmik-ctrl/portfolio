import {
  BuiltInAgent,
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { PORTFOLIO_A2UI_PROMPT } from "@/lib/a2ui/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const a2uiSchema = [
  {
    name: "ProjectCard",
    description:
      "A selected-work project card with name, short blurb, comma-separated tags, and an optional link.",
    props: {
      type: "object",
      properties: {
        name: { type: "string" },
        blurb: { type: "string" },
        tags: { type: "string" },
        href: { type: "string" },
      },
    },
  },
  {
    name: "JourneyBeat",
    description: "A single beat from Sanradhya's career journey timeline.",
    props: {
      type: "object",
      properties: {
        year: { type: "string" },
        title: { type: "string" },
        summary: { type: "string" },
      },
    },
  },
  {
    name: "ServicePlan",
    description: "An engagement option (review, scoped build, or iteration).",
    props: {
      type: "object",
      properties: {
        name: { type: "string" },
        price: { type: "string" },
        description: { type: "string" },
      },
    },
  },
  {
    name: "ContactCta",
    description: "A prominent call-to-action that links to contact, email, GitHub, or LinkedIn.",
    props: {
      type: "object",
      properties: {
        label: { type: "string" },
        href: { type: "string" },
      },
    },
  },
];

const agent = new BuiltInAgent({
  model: "google/gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY,
  prompt: PORTFOLIO_A2UI_PROMPT,
  maxSteps: 8,
  temperature: 0.4,
});

const copilotRuntime = new CopilotRuntime({
  agents: { default: agent },
  a2ui: {
    injectA2UITool: true,
    schema: a2uiSchema,
  },
});

const handler = createCopilotRuntimeHandler({
  runtime: copilotRuntime,
  basePath: "/api/copilotkit",
});

export { handler as GET, handler as POST };
