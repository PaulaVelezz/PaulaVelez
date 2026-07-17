import { useEffect, useState } from "react";
import { gsap } from "gsap";
import AsciiPortrait from "./AsciiPortrait.jsx";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { TbCircleArrowDown, TbCircleArrowRight } from "react-icons/tb";
import ResumeENG from "/CV_Paula_Velez_ Frontend_Developer_(ENG).pdf";
import ResumeESP from "/CV_Paula_Velez_ Desarrollador_Frontend_(ESP).pdf";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";

function Hero({ setPage }) {
  const [startSecondaryReveal, setStartSecondaryReveal] = useState(false);
  const [portraitRevealed, setPortraitRevealed] = useState(false);

  useEffect(() => {
    if (startSecondaryReveal) {
      gsap.fromTo(
        ".hero-sub-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
      // Trigger ASCII portrait entrance
      setPortraitRevealed(true);
    }
  }, [startSecondaryReveal]);

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col justify-between z-10 pb-5">
      <div className="w-full flex justify-between items-center px-6 py-6 md:px-12 border-b border-white/5">
        <button
          onClick={() => setPage("home")}
          className="text-3xl font-bold cursor-pointer text-white font-korium select-none hover:text-[#a3e635] transition-colors"
          data-cursor="magnetic"
          aria-label="Home page logo link"
        >
          PAULA VELEZ <span className="text-[#A3E635]">.</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 my-auto py-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-8 select-none">
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <TextRevealCurtain
                as="h1"
                className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider leading-none text-white"
                lines={["Frontend & "]}
              />
            </div>

            <div className="overflow-hidden">
              <TextRevealCurtain
                as="h1"
                className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider leading-none text-neutral-500"
                lines={["Creative Developer."]}
                onComplete={() => setStartSecondaryReveal(true)}
              />
            </div>
          </div>

          <div className="hero-sub-reveal opacity-0 max-w-[540px]">
            <p className="text-sm md:text-base text-neutral-400 font-grotesk">
              Soy Paula. Me especializo en desarrollar soluciones digitales e
              interfaces modernas, responsivas y accesibles, con especial
              atención al diseño, la experiencia de usuario y las animaciones
              que hacen que un producto se sienta cuidado.
              <br />
              <br />
              Actualmente estoy abierta a oportunidades remotas e híbridas donde
              pueda aportar valor, seguir creciendo profesionalmente y colaborar
              con equipos en la creación de productos digitales con impacto.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="hero-sub-reveal opacity-0 flex items-center gap-6 ">
            <div className="relative group">
              <button
                className="h-11 px-8 bg-[#84CC16] hover:bg-[#a3e635] flex items-center  gap-2 text-white text-xs font-space font-bold tracking-widest transition-colors cursor-pointer rounded-2xl"
                data-cursor="magnetic"
              >
                CV / RESUME
                <span>
                  <TbCircleArrowDown />
                </span>
              </button>

              <div
                className="
                absolute
                top-full
                left-0
                mt-2
                min-w-[180px]
                bg-[#070708]
                border
                border-white/10
                opacity-0
                invisible
                translate-y-2
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition-all
                duration-300
                rounded-2xl
                overflow-hidden
              "
              >
                <a
                  href={ResumeESP}
                  target="_blank"
                  rel="noopener noreferrer"
                  arialabel="Spanish resume link"
                  className="
                  block
                  px-5
                  py-4
                  text-xs
                  tracking-widest
                  font-space
                  text-white
                  hover:bg-white/5
                "
                >
                  CV (ESP) <LiaFileDownloadSolid />
                </a>

                <a
                  href={ResumeENG}
                  target="_blank"
                  rel="noopener noreferrer"
                  arialabel="English resume link"
                  className="
                  block
                  px-5
                  py-4
                  text-xs
                  tracking-widest
                  font-space
                  text-white
                  hover:bg-white/5
                  border-t
                  border-white/10
                "
                >
                  CV (ENG) <LiaFileDownloadSolid />
                </a>
              </div>
            </div>
            <button
              onClick={() => setPage("projects")}
              className="
              text-zinc-900
               bg-white
              hover:text-[#6d28d9]
              h-11
              px-6
              rounded-2xl
              text-xs
              font-space
              font-bold
              tracking-widest
              transition-colors
              flex
              items-center
              gap-2
            "
              data-cursor="magnetic"
            >
              EXPLORE WORK
              <span>
                <TbCircleArrowRight />
              </span>
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center lg:justify-end overflow-hidden w-full">
          <div className="w-full max-w-[420px] max-h-[440px]">
            <AsciiPortrait isRevealed={portraitRevealed} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
