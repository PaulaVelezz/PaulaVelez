import React, { useRef } from "react";
import ProjectCard from "./ProjectCard.jsx";
import projectDetailData from "../../data/ProjectDetailData.js";
import { motion, useScroll, useSpring } from "framer-motion";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";

const ProjectDetails = () => {
  const ProjectRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ProjectRef,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={ProjectRef} className="relative bg-[#0a0a0c] py-32">
      <div className="sticky top-0 left-0 flex flex-col items-center justify-center text-center text-zinc-950 mt-14 pt-3 bg-[#f5f5f4bd] backdrop:filter backdrop-blur-sm rounded-md z-30">
        <TextRevealCurtain
          as="h1"
          className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
          lines={["Projects"]}
        />
        <motion.div
          style={{ scaleX }}
          className="w-[95%] h-[2px] bg-violet-700 rounded-sm mt-3"
        ></motion.div>
      </div>

      <div
        id="project-details"
        className="max-w-7xl mx-auto p-5 mt-6 mb-14 grid grid-cols-1 md:grid-cols-2 gap-11"
      >
        {projectDetailData.map((project) => (
          <ProjectCard
            key={project.id}
            slug={project.slug}
            title={project.title}
            categories={project.categories}
            projectType={project.projectType}
            stack={project.stack}
            cover={project.cover}
            AbsBG={project.AbsBG}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectDetails;
