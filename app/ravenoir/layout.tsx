import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "RAVENOIR",
  description: "PLAY OFFLINE.",
  manifest: "/ravenoir-manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RavenoirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
