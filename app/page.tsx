import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { ChapterAbout } from "@/components/home/chapter-about";
import { ChapterSkills } from "@/components/home/chapter-skills";
import { ChapterProjects } from "@/components/home/chapter-projects";
import { ChapterJourney } from "@/components/home/chapter-journey";
import { ChapterTjkt } from "@/components/home/chapter-tjkt";
import { ChapterInterests } from "@/components/home/chapter-interests";
import { ChapterPersonal } from "@/components/home/chapter-personal";
import { ChapterContact } from "@/components/home/chapter-contact";
import { SectionDivider } from "@/components/home/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SectionDivider variant="glow" />
      <ChapterAbout />
      <SectionDivider variant="dots" />
      <ChapterSkills />
      <SectionDivider variant="glow" />
      <ChapterProjects />
      <SectionDivider variant="dots" />
      <ChapterJourney />
      <SectionDivider variant="glow" />
      <ChapterTjkt />
      <SectionDivider variant="dots" />
      <ChapterInterests />
      <SectionDivider variant="glow" />
      <ChapterPersonal />
      <SectionDivider variant="line" />
      <ChapterContact />
    </>
  );
}
