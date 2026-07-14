import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import projectDetailData from "../data/ProjectDetailData.js";
import TextRevealCurtain from "../components/common/TextRevealCurtain.jsx";

const ProjectsPage = ({ setPage }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#f0f0f5] text-black px-6 pt-36 pb-20 md:px-12 md:pb-32 z-10"
    >
      {/* Title Content */}
      <section
        id="work"
        className="max-w-7xl mx-auto w-full px-6 pb-20 md:px-12 md:pb-24"
      >
        {/* Headline Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 select-none">
          <div className="lg:col-span-8">
            <TextRevealCurtain
              as="h2"
              className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider leading-[0.9] text-[#0a0a0c] uppercase"
              lines={["SELECTED WORK"]}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6 lg:pt-0">
            <p className="text-xs font-grotesk font-medium tracking-wider text-[#0a0a0c] max-w-sm lg:text-right">
              Una selección de trabajos hechos con equipos de producto, agencias
              y startups. Cada card abre una vista completa del proyecto.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <aside className="max-w-3xl border-l border-violet pl-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="text-accent font-bold">Nota:</span> Parte de los
              proyectos presentados fueron desarrollados durante mi experiencia
              como Front-end Developer en una agencia digital. En cada caso
              participé en el desarrollo e implementación del sitio, trabajando
              junto a equipos de diseño, UX y gestión de proyectos.
            </p>
          </aside>
        </div>
      </section>

      {/* 2. Projects Grid*/}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {projectDetailData.map((project) => {
          const cardRef = useRef(null);
          const imgRef = useRef(null);

          const handleMouseMove = (e) => {
            const card = cardRef.current;
            const img = imgRef.current;
            if (!card || !img) return;

            const rect = card.getBoundingClientRect();
            // Normalized relative coordinates inside card (-0.5 to 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Tilt card container on X and Y axes
            gsap.to(card, {
              rotateX: -y * 12,
              rotateY: x * 12,
              scale: 1.015,
              duration: 0.35,
              ease: "power2.out",
            });

            // Parallax image in opposite direction to create window depth effect
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

            // Reset smoothly to default resting coordinates
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
            <div
              key={project.id}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setPage(`/project/${project.id}`)}
              className="project-card group flex flex-col gap-4 cursor-pointer"
              style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
              data-cursor="view"
              tabIndex={0}
              role="button"
              aria-label={`View case study for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setPage(`/project/${project.id}`);
                }
              }}
            >
              {/* Thumbnail Card with rounded corners */}
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

              {/* Typography metadata */}
              <div
                className="flex justify-between items-center px-2 select-none"
                style={{ transform: "translateZ(25px)" }}
              >
                <div className="flex flex-col text-left">
                  <h3 className="text-lg font-space font-bold tracking-tight text-neutral-900 group-hover:text-[#84cc16] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-neutral-400 font-sans">
                    {project.projectType}
                  </span>
                </div>
                <span className="text-xs font-space font-bold text-neutral-400">
                  {project.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
