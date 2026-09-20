"use client";

import { CopilotKit, CopilotPopup } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
import { portfolioA2UICatalog } from "@/lib/a2ui/catalog";

const LIME = "#E8FF47";
const INK = "#0a0a0a";
const BEIGE = "#DED8C9";

const a2uiTheme = {
  colors: {
    primary: INK,
    secondary: LIME,
    accent: LIME,
    background: BEIGE,
    surface: "#efece3",
    text: INK,
  },
};

const SHOW_CHATBOT = false;

export default function A2UIChatProvider({ children }: { children: React.ReactNode }) {
  if (!SHOW_CHATBOT) {
    return <>{children}</>;
  }

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      enableInspector={false}
      a2ui={{
        theme: a2uiTheme,
        catalog: portfolioA2UICatalog,
      }}
    >
      {children}
      <div className="portfolio-a2ui-chat">
        <CopilotPopup
          agentId="default"
          defaultOpen={false}
          width={360}
          height={460}
          clickOutsideToClose
          labels={{
            modalHeaderTitle: "Ask Sanradhya",
            chatInputPlaceholder: "Projects, skills, or a call…",
            welcomeMessageText: "Ask about selected work, the journey, or getting in touch.",
            chatDisclaimerText: "AI can miss details — double-check what matters.",
            chatToggleOpenLabel: "Open portfolio assistant",
            chatToggleCloseLabel: "Close portfolio assistant",
          }}
        />
      </div>
    </CopilotKit>
  );
}
