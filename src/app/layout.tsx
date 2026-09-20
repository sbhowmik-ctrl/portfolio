import type { Metadata } from "next";
import { Geist_Mono, SUSE, Alice, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import A2UIChatProvider from "@/app/components/A2UIChatProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const suse = SUSE({
  variable: "--font-suse",
  subsets: ["latin"],
});

const alice = Alice({
  variable: "--font-alice",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sanradhya Bhowmik | AI & Systems Engineer",
  description:
    "CSE (AIML) engineer building scalable, decentralized, and production-ready intelligent systems across AI, distributed systems, and cloud infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${geistMono.variable} ${suse.variable} ${alice.variable} ${playfair.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LoadingOverlay />
        <A2UIChatProvider>
          <div className="relative z-10 overflow-x-clip">
            <Navbar />
            <div id="main-content" role="main" tabIndex={-1} className="min-h-screen overflow-x-clip">
              {children}
            </div>
            <Toaster position="top-right" richColors />
            <Footer />
          </div>
        </A2UIChatProvider>
      </body>
    </html>
  );
}
