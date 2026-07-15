import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

function ProjectCardSecondary({ project, setPage }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;

    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 12,
      rotateY: x * 12,
      scale: 1.015,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(img, {
      x: -x * 24,
      y: -y * 24,
      scale: 1.08,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1.0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(img, {
      x: 0,
      y: 0,
      scale: 1.0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setPage(`/project/${project.slug}`)}
      className="project-card group flex flex-col gap-4 cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      data-cursor="view"
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setPage(`/project/${project.slug}`);
        }
      }}
    >
      <div
        className="w-full aspect-video rounded-3xl overflow-hidden border border-neutral-200/50 shadow-md bg-neutral-900"
        style={{ transform: "translateZ(15px)" }}
      >
        <img
          ref={imgRef}
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      <div
        className="flex justify-between items-center px-2 select-none"
        style={{ transform: "translateZ(25px)" }}
      >
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-space font-bold tracking-tight text-neutral-900 group-hover:text-[#84cc16] transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-neutral-400 font-sans">
            {project.projectType.join(", ")}
          </span>
        </div>
        <span className="text-xs font-space font-bold text-neutral-400">
          {project.year}
        </span>
      </div>
    </motion.div>
  );
}

export default ProjectCardSecondary;
