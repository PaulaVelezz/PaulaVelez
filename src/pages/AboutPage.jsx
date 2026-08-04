import React, { useEffect } from "react";
import About from "../components/About/About.jsx";
import stackData from "../data/StackData.js";
import experiencesData from "../data/ExperiencesData.js";
import TextRevealCurtain from "../components/common/TextRevealCurtain.jsx";
import ExperienceTimeline from "../components/Experience/ExperienceTimeline.jsx";
import StackIntroStack from "../components/About/StackIntroStack.jsx";
import ContactClosing from "../components/Contact/ContactClosing.jsx";
import { useLocation } from "react-router-dom";

const AboutPage = () => {
  const { hash } = useLocation();

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
                lines={["Habilidades y Herramientas"]}
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
              // EXPERIENCIA
            </span>
            <TextRevealCurtain
              as="h2"
              className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
              lines={["TRAYECTORIA PROFESIONAL"]}
            />
          </div>
        }
      />

      <ContactClosing />
    </>
  );
};

export default AboutPage;
