import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LIGHT_BG = "#F0F0F5";
const MID_BG = "#050505";
const DARK_BG = "#0A0A0C";

const LIGHT_TEXT = "#0A0A0C";
const DARK_TEXT = "#F5F5F5";

const CTABanner = ({ fromBg = LIGHT_BG, fromText = LIGHT_TEXT }) => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const eyebrowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textEls = [headlineRef.current, subRef.current, eyebrowRef.current];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    // Tramo 1
    tl.fromTo(
      section,
      { backgroundColor: fromBg },
      { backgroundColor: MID_BG, ease: "none", duration: 1 },
      0,
    )
      .fromTo(
        textEls,
        { color: fromText },
        { color: DARK_TEXT, ease: "none", duration: 1 },
        0,
      )
      .fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 1 },
        0,
      )
      // Tramo 2
      .to(section, { backgroundColor: DARK_BG, ease: "none", duration: 1 }, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromBg, fromText]);

  const scrollToForm = () => {
    document
      .getElementById("contact_closing")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ backgroundColor: fromBg }}
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[900px] h-[900px] rounded-full
          bg-[#6D28D9]/10 blur-[180px]
          pointer-events-none opacity-0
        "
      />

      <p
        ref={eyebrowRef}
        className="relative text-xs md:text-sm uppercase tracking-[0.3em] font-space mb-6 opacity-70"
      >
        Freelance · Colaboraciones · Oportunidades laborales
      </p>

      <h2
        ref={headlineRef}
        className="relative font-korium text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
      >
        Hablemos de tu proyecto
        <br />
        <span className="text-[#A3E635]">o de sumarme a tu equipo.</span>
      </h2>

      <p
        ref={subRef}
        className="relative mt-6 max-w-xl text-base md:text-lg opacity-80 font-space"
      >
        Desde freelance hasta full-time — si tenés una idea, un proyecto o una
        propuesta, este es el lugar para empezar la conversación.
      </p>

      <button
        onClick={scrollToForm}
        aria-label="Ir al formulario de contacto"
        className="
          relative mt-14 w-14 h-14 rounded-full border border-current
          flex items-center justify-center
          animate-bounce cursor-pointer
          hover:border-[#A3E635] hover:text-[#A3E635]
          transition-colors
        "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
};

export default CTABanner;
