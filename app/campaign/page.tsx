import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, Space_Mono } from "next/font/google";
import { CampaignPage } from "@/components/campaign/campaign-page";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-campaign-anton",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-campaign-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-campaign-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ULTRA VELOCITY · Built to Move",
  description:
    "Engineered for speed. Designed for movement. A concept campaign page for ULTRA VELOCITY.",
};

export default function CampaignRoute() {
  return (
    <div
      className={`${anton.variable} ${hanken.variable} ${spaceMono.variable} min-h-dvh bg-puma-bg font-hanken text-puma-muted antialiased`}
    >
      <CampaignPage />
    </div>
  );
}
