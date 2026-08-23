import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import SecretPage from "./secret-client";

const scriptFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-secret-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "psst…",
  robots: { index: false, follow: false },
};

export default function Secret() {
  return (
    <div className={scriptFont.variable}>
      <SecretPage />
    </div>
  );
}
