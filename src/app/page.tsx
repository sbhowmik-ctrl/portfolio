import homeContent from "../../public/content/home.json";
import contactLinks from "../../public/content/contact-links.json";
import NeshHome, { type HomeContent } from "@/app/components/NeshHome";

export default function Home() {
  return (
    <NeshHome
      content={homeContent as HomeContent}
      contact={{
        email: contactLinks.email,
        linkedinUrl: contactLinks.linkedinUrl,
        githubUrl: contactLinks.githubUrl,
      }}
    />
  );
}
