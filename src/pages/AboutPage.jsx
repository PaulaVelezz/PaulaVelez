import React, { useEffect } from "react";
import About from "../components/About/About.jsx";
import stackData from "../data/StackData.js";
import experiencesData from "../data/ExperiencesData.js";
import TextRevealCurtain from "../components/common/TextRevealCurtain.jsx";
import ExperienceTimeline from "../components/Experience/ExperienceTimeline.jsx";
import StackIntroStack from "../components/About/StackIntroStack.jsx";
import ContactClosing from "../components/Contact/ContactClosing.jsx";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CTABanner from "../components/Contact/CTABanner.jsx";

const AboutPage = () => {
  const { hash } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!hash) return;

    const section = document.querySelector(hash);

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [hash]);

  return (
    <>
      <About />

      <StackIntroStack
        id="services"
        stacks={stackData}
        header={
          <>
            <span className="text-[#6d28d9] uppercase tracking-[0.35em] text-xs block mb-4">
              // STACK
            </span>
            <div className="flex justify-center mt-6">
              <TextRevealCurtain
                as="h2"
                className="uppercase text-4xl md:text-6xl font-extrabold font-korium tracking-wider text-zinc-950"
                lines={[t("about.stack.title")]}
              />
            </div>
          </>
        }
      />

      <ExperienceTimeline
        experiences={experiencesData}
        header={
          <div className="flex flex-col justify-center items-center">
            <span className="text-[#6d28d9] uppercase tracking-[0.35em] text-xs block mb-4">
              // {t("about.experience.label")}
            </span>
            <TextRevealCurtain
              as="h2"
              className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
              lines={[t("about.experience.title")]}
            />
          </div>
        }
      />
      <CTABanner fromBg="#0A0A0C" fromText="#F5F5F5" />
      <ContactClosing />
    </>
  );
};

export default AboutPage;
