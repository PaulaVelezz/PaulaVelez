import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { ImMail } from "react-icons/im";
import { motion } from "framer-motion";
import TextRevealCurtain from "../common/TextRevealCurtain";
import ProfileIdentityCard from "./ProfileIdentityCard";
import { TbCircleArrowDown, TbCircleArrowRight } from "react-icons/tb";

const About = () => {
  const profile = useRef(null);

  const aboutRef = useRef(null);
  const header = useRef(null);
  const aboutBody = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top 400px",
      animation: gsap
        .timeline()
        .to(
          header.current,
          {
            opacity: 1,
            y: 0,
            ease: "power4.out",
            duration: 1.25,
          },
          0,
        )
        .to(
          aboutBody.current,
          {
            opacity: 1,
            y: 0,
            ease: "power4.out",
            duration: 1.25,
          },
          0.2,
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          0.45,
        ),

      toggleActions: "play none none none",
    });

    ScrollTrigger.refresh();
  }, [aboutRef]);

  return (
    <section ref={aboutRef} className="p-4 mt-4 mb-4">
      <div className="mt-10 mb-10 p-4 gap-2 flex flex-col items-start md:flex-row">
        <motion.div
          ref={profile}
          className="justify-center flex-shrink-0 flex top-28 overflow-hidden rounded-md md:sticky md:w-1/2"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 1,
            delay: 0.5,
          }}
        >
          <ProfileIdentityCard />
        </motion.div>

        <div className="top-24 sm:sticky max-w-[560px]">
          <div className="w-full font-space pl-4 pr-9">
            <TextRevealCurtain
              ref={header}
              as="h1"
              className="text-6xl font-extrabold mb-4 font-korium"
              lines={["About"]}
            />
            <p
              className="font-grotesk 2xl:text-4xl text-sm md:text-base"
              ref={aboutBody}
            >
              Hi there! 👋🏼 I'm Paula, a Frontend Developer based in Argentina.
              <br />
              <br />
              I specialize in building digital solutions and modern, responsive,
              and accessible interfaces, with a strong focus on design, user
              experience, and thoughtful motion that makes digital products feel
              polished, intuitive, and engaging.
              <br />
              <br />
              I believe that collaboration, clear communication, and attention
              to detail are essential to creating successful digital
              experiences. I enjoy working closely with designers, developers,
              and product teams.
              <br />
              <br />
              I'm currently open to remote and hybrid job opportunities where I
              can contribute, continue growing professionally.
            </p>

            {/* Interactive CTAs */}
            <div
              ref={buttonsRef}
              className="opacity-0 translate-y-6 mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="relative group">
                <button
                  className="h-11 px-8 bg-[#84CC16] hover:bg-[#a3e635] flex items-center gap-2 text-white text-xs font-space font-bold tracking-widest  uppercase transition-colors cursor-pointer rounded-2xl"
                  data-cursor="magnetic"
                >
                  <span>Connect with me</span>
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
                    href="https://github.com/PaulaVelezz"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                  flex
    items-center
    justify-between
                  px-5
                  py-4
                  text-xs
                  tracking-widest
                  font-space
                  text-white
                  hover:bg-white/5 "
                  >
                    <span>GitHub</span>
                    <FaGithubSquare className="text-2xl" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/paula-velez/"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    target="_blank"
                    className="
                 flex
    items-center
    justify-between
                  px-5
                  py-4
                  text-xs
                  tracking-widest
                  font-space
                  text-white
                  hover:bg-white/5 "
                  >
                    <span>Linkedin</span>
                    <FaLinkedin className="text-2xl" />
                  </a>

                  <a
                    href="mailto:velezpaula.a@gmail.com"
                    rel="noopener noreferrer"
                    arialabel="Send me an email"
                    className="
                            flex
    items-center
    justify-between
                              px-5
                              py-4
                              text-xs
                              tracking-widest
                              font-space
                              text-white
                              hover:bg-white/5 "
                  >
                    <span>Email</span>
                    <ImMail className="text-2xl" />
                  </a>
                </div>
              </div>
              <button
                onClick={() => setPage("experience")}
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
                          cursor-pointer
                          uppercase
                        "
                data-cursor="magnetic"
              >
                View Experience
                <span>
                  <TbCircleArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
