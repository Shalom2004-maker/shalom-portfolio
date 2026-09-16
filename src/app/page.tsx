import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { MoreWork } from "@/components/sections/MoreWork";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Capabilities />
      <ExperienceEducation />
      <MoreWork />
      <Contact />
    </>
  );
}
