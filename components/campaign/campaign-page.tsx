"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/components/motion/mouse";
import { CampaignNav } from "@/components/campaign/campaign-nav";
import { CampaignHero } from "@/components/campaign/campaign-hero";
import { CampaignProductIntro } from "@/components/campaign/campaign-product-intro";
import { CampaignEngineering } from "@/components/campaign/campaign-engineering";
import { CampaignSpecs } from "@/components/campaign/campaign-specs";
import { CampaignStorytelling } from "@/components/campaign/campaign-storytelling";
import { CampaignCta } from "@/components/campaign/campaign-cta";
import { CampaignFooter } from "@/components/campaign/campaign-footer";

gsap.registerPlugin(ScrollTrigger);

export function CampaignPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      if (prefersReducedMotion()) {
        gsap.set(reveals, { clearProps: "opacity,transform" });
        return;
      }

      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <CampaignNav />
      <main>
        <CampaignHero />
        <CampaignProductIntro />
        <CampaignEngineering />
        <CampaignSpecs />
        <CampaignStorytelling />
        <CampaignCta />
      </main>
      <CampaignFooter />
    </div>
  );
}
