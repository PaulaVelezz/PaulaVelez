import React from "react";
import { TbArrowBigUpLine } from "react-icons/tb";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import TextRevealCurtain from "../common/TextRevealCurtain";

const Footer = () => {
  const text =
    "I'd love to hear from you and explore collaboration, answer your questions or discuss a new project.".split(
      " ",
    );
  return (
    <>
      <footer
        id="footer"
        className="flex flex-col w-full justify-center items-center gap-10 p-10 bg-zinc-950 rounded-t-2xl"
      >
        <TextRevealCurtain
          as="h1"
          className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider text-stone-100"
          lines={["Let's get in touch!"]}
        />
        <div className="flex gap-1 flex-wrap lg:flex-nowrap">
          {text.map((word, index) => (
            <motion.p
              key={index}
              className="text-stone-100 sm:text-xl md:text-2xl xs:gap-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: index / 10 }}
              viewport={{ once: true }}
            >
              {word}{" "}
            </motion.p>
          ))}
        </div>

        <div className="flex items-start flex-col gap-4 justify-start overflow-hidden p-0 relative w-[97%]">
          <span className="bg-violet-700 h-[2px] overflow-hidden relative w-full"></span>
        </div>

        <div className="flex flex-wrap gap-5 justify-center items-center">
          <div className="items-center flex flex-row md:flex-col lg:flex-col justify-between p-4 w-52 sm:h-fit md:h-48 lg:h-48 rounded-xl border border-violet-700 hover:bg-violet-700">
            <div className="place-items-start text-3xl w-full">
              <IoIosMail style={{ color: "#f7f7f7" }} />
            </div>

            <div className="flex items-center gap-3 text-xl text-violet-700 hover:text-[#f7f7f7]">
              <a
                href="mailto:velezpaula.a@gmail.com"
                className="text-stone-100 items-center flex flex-row justify-center w-full gap-2 p-2 rounded-xl"
              >
                Send a message
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="items-center flex flex-row md:flex-col lg:flex-col justify-between p-4 w-52 sm:h-fit md:h-48 lg:h-48 rounded-xl border border-violet-700 hover:bg-violet-700">
            <div className="place-items-start text-3xl w-full">
              <FaLinkedin style={{ color: "#f7f7f7" }} />
            </div>

            <div className="flex items-center gap-3 text-xl text-violet-700 hover:text-[#f7f7f7]">
              <a
                href="https://linkedin.com/in/paula-velez/"
                className="text-stone-100 items-center flex flex-row justify-center w-full gap-2 p-2 rounded-xl"
              >
                Connect with LinkedIn
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="items-center flex flex-row md:flex-col lg:flex-col justify-between p-4 w-52 sm:h-fit md:h-48 lg:h-48 rounded-xl border border-violet-700 hover:bg-violet-700">
            <div className="place-items-start text-3xl w-full">
              <FaGithub style={{ color: "#f7f7f7" }} />
            </div>

            <div className="flex items-center gap-3 text-xl text-violet-700 hover:text-[#f7f7f7]">
              <a
                href="https://github.com/PaulaVelezz"
                className="text-stone-100 items-center flex flex-row justify-center w-full gap-2 p-2 rounded-xl"
              >
                Connect with Github
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-zinc-950 text-sm text-stone-200 font-semibold flex flex-col sm:flex-row items-center gap-5 justify-between w-full py-10 px-4 border-t-2 border-zinc-800">
        <div className="">
          <p>Designed and Developed by Paula Velez &#169; 2026 </p>
        </div>
        <div>
          <p>Thanks for your visit 👋</p>
        </div>
        <div className="flex items-center py-1 px-4 text-base border border-dashed border-zinc-400 rounded-xl">
          <a className="flex justify-center items-center gap-2" href="#home">
            Back to the top <TbArrowBigUpLine className="animate-bounce" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
