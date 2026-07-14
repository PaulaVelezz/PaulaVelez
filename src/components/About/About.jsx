import React, { useEffect, useRef, useState } from "react";
import PROFILE from "/Perfil_2026.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { ImMail } from "react-icons/im";
import { motion, useScroll } from "framer-motion";
import TextRevealCurtain from "../common/TextRevealCurtain";

const About = () => {
  const profile = useRef(null);

  const aboutRef = useRef(null);
  const header = useRef(null);
  const aboutBody = useRef(null);

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
          <img
            src={PROFILE}
            width={"100%"}
            height={"auto"}
            loading="lazy"
            className="hidden object-cover bg-lime-400 object-center rounded-lg border border-r-[7px] border-b-[7px] border-violet-700 md:w-64 md:h-auto md:block sm:hidden"
            alt="profile"
          />
        </motion.div>

        <div className="top-20 sm:sticky md:top-28 lg:top-32 md:w-1/2">
          <div className="w-full font-space pl-4 pr-9">
            <TextRevealCurtain
              ref={header}
              as="h1"
              className="text-6xl font-extrabold mb-4 font-korium"
              lines={["About"]}
            />
            <p
              className="translate-y-10 font-grotesk 2xl:text-4xl"
              ref={aboutBody}
            >
              Hi there! &#128075;&#127996; Nice to meet you! I&#39;m Paula, and
              I&#39;m a frontend developer based in Argentina &#127758;. I&#39;m
              passionate about transforming concepts or ideas into reality, by
              crafting visually engaging and effective web solutions.
              <br></br>
              <br></br>I believe that encouraging a calm and collaborative
              approach, and ensuring clear communication are key throughout the
              development process.
              <br></br>
              <br></br>I thrive working collaborative with clients, designers,
              and developers to ensure that every project is a harmonious blend
              of creativity and functionality. &#129308;&#127996;
              ✨&#129307;&#127996;
              <br></br>
              <br></br>
              I&#39;m currently open to job opportunities, both remote and
              non-remote, where I can contribute, learn, and grow. If you have
              an exciting opportunity that aligns with my skills and experience,
              I&#39;d love to hear from you!
              <br></br>
              <br></br>
            </p>
            <ul className="flex text-xl gap-4">
              <li>
                <a href="https://github.com/PaulaVelezz" aria-label="GitHub">
                  <FaGithubSquare />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/paula-velez/"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="mailto:velezpaula.a@gmail.com" aria-label="Email">
                  <ImMail />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
