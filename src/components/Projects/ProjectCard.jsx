import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import grain from "../../assets/grain.svg";

const ProjectCard = ({ title, slug, categories, stack, cover, AbsBG }) => {
  const [isHoveredTitle, setIsHoveredTitle] = useState(null);

  return (
    <motion.article
      className="bg-zinc-950 rounded-lg overflow-hidden p-3"
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div
        className="relative aspect-square overflow-hidden group"
        onMouseEnter={() => setIsHoveredTitle(title)}
        onMouseLeave={() => setIsHoveredTitle(null)}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            className={`object-cover rounded-lg transition-all duration-700 ${isHoveredTitle === title ? "scale-110 blur-sm brightness-50" : "scale-100"} `}
            src={AbsBG}
            alt="abstract bg"
          />
          <div
            className={`absolute inset-0 opacity-50 bg-[url('${grain}')]`}
          ></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            className={`relative w-full aspect-square transition-all duration-700 ${isHoveredTitle === title ? "scale-110" : "scale-90"}`}
          >
            <img
              src={cover}
              alt="project mockup"
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHoveredTitle === title ? "opacity-100" : "opacity-0"}`}
        >
          <Link
            to={`/project/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black/80 text-white font-medium rounded-md hover:bg-black/90 transition-colors"
          >
            View More
            <svg
              stroke="currentColor"
              color="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 17 17 7"></path>
              <path d="M7 7 17 7 17 17"></path>
            </svg>
          </Link>
        </div>

        <div className="absolute bottom-14 left-0 right-0 flex flex-wrap gap-2 p-4">
          {stack.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="inline-flex px-3 py-1 text-xs md:px-2 lg:text-sm md:text-xs font-light rounded-md bg-black/80 hover:bg-black/90 transition-colors text-stone-50 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
          {stack.length > 5 && (
            <span className="inline-flex px-3 py-1 text-xs md:px-2 lg:text-sm md:text-xs font-light rounded-md bg-black/40 text-stone-300 backdrop-blur-sm">
              +{stack.length - 5}
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-100">
            {title}
          </h2>
          {categories &&
            categories.map((category, index) => (
              <span
                key={index}
                className="p-1 text-xs lg:text-sm md:text-xs font-semibold rounded-md bg-lime-400 text-zinc-800"
              >
                {category}
              </span>
            ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
