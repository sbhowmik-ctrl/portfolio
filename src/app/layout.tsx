import type { Metadata } from "next";
import { Geist_Mono, SUSE, Alice, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import LoadingOverlay from "@/app/components/LoadingOverlay";

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
    <html lang="en">
      <body
        className={`${geistMono.variable} ${suse.variable} ${alice.variable} ${playfair.variable} antialiased`}
      >
        <LoadingOverlay />
        <Navbar />
        {children}
        <Toaster position="top-right" richColors />
        <Footer />
      </body>
    </html>
  );
}
