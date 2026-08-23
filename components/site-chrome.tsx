"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (["/secret", "/campaign", "/experience", "/jarvis", "/login", "/dashboard", "/ravenoir"].includes(pathname)) return <>{children}</>;
  return (
    <>
      <SmoothScroll>
        <Cursor />
        <Navbar />
        {children}
        <Footer />
        <div className="h-16 md:hidden" aria-hidden />
      </SmoothScroll>
    </>
  );
}
