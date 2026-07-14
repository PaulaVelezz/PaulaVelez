import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import projectDetailData from "../data/ProjectDetailData.js";
import { Link } from "react-router-dom";
import TextRevealCurtain from "../components/common/TextRevealCurtain.jsx";

gsap.registerPlugin(ScrollTrigger);

function ProjectDetailPage({ setPage }) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollRef = useRef(null);

  const progressBarRef = useRef(null);
  const nextTitleRef = useRef(null);
  const transitionTriggered = useRef(false);

  const { slug } = useParams();
  const projectDetail = projectDetailData.find(
    (p) => p.slug === slug || p.id === slug,
  );

  const nextProjectData = projectDetailData.find(
    (p) => p.slug === projectDetail.nextProject,
  );
  const prevProjectData = projectDetailData.find(
    (p) => p.slug === projectDetail.prevProject,
  );

  // Horizontal Scroll Pinning (GSAP ScrollTrigger)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const triggerElement = triggerRef.current;
    if (!scrollContainer || !triggerElement) return;

    const calculateScrollWidth = () => {
      return -(scrollContainer.scrollWidth - window.innerWidth);
    };

    // Extra scroll depth for filling progress loader at the end
    const extraScroll = 900;

    const pin = gsap.fromTo(
      scrollContainer,
      { x: 0 },
      {
        x: calculateScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () =>
            `+=${scrollContainer.scrollWidth - window.innerWidth + extraScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress; // 0 to 1
            const scrollRange = scrollContainer.scrollWidth - window.innerWidth;
            const currentScroll = progress * (scrollRange + extraScroll);

            // Calculate progress specifically inside the hold-fill zone
            let fillProgress = 0;
            if (currentScroll > scrollRange) {
              fillProgress = Math.min(
                1,
                (currentScroll - scrollRange) / extraScroll,
              );
            }

            // Directly adjust style transforms to bypass React rendering cycles
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${fillProgress * 100}%`;
            }
            if (nextTitleRef.current) {
              nextTitleRef.current.style.transform = `scale(${1 + fillProgress * 0.12})`;
            }

            if (fillProgress >= 0.99 && !transitionTriggered.current) {
              transitionTriggered.current = true;
              if (nextProjectData) {
                setPage(`/project/${nextProjectData.slug}`);
              } else {
                setPage("/");
              }
            }
          },
        },
      },
    );

    return () => {
      pin.scrollTrigger?.kill();
    };
  }, [setPage]);

  return (
    <>
      <article>
        <div
          ref={containerRef}
          className="relative w-full z-10 bg-[#0a0a0c] text-white"
        >
          {/* HERO */}
          <header className="relative min-h-[90svh] pt-32">
            <div className="container-editorial">
              <div className="flex items-center gap-4">
                <Link to="/projects" className="link-underline">
                  ← Volver a Proyectos
                </Link>
              </div>

              <TextRevealCurtain
                as="h1"
                className="text-4xl md:text-7xl mb-4 mt-10 font-extrabold font-korium tracking-wider text-foreground"
                lines={[projectDetail.title]}
              />

              <div className="mt-8 grid grid-cols-12 gap-6">
                <p className="editorial col-span-12 text-xl text-foreground/85 md:col-span-8">
                  {projectDetail.summary}
                </p>
                <dl className="col-span-12 grid grid-cols-2 gap-6 text-sm md:col-span-4">
                  <div>
                    <dt className="mb-1 text-[#a3e635]">Rol</dt>
                    <dd>{projectDetail.role}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-[#a3e635]">Año</dt>
                    <dd>{projectDetail.year}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="container-editorial mt-20">
              <div className="col-span-12 md:col-span-6">
                <div className=" mb-5 text-[#a3e635]">
                  (00) — Project Overview
                </div>
                <p className="text-xl text-foreground">
                  {projectDetail.overview}
                </p>
              </div>
            </div>
          </header>

          {/* CHALLENGE / LEARNINGS */}
          <section className="container-editorial mb-10 mt-10 grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-6">
              <div className="text-[#a3e635]">(01) — Challenge</div>
              <p className="editorial mt-6 text-xl text-foreground">
                {projectDetail.challenge}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="text-[#a3e635]">(02) — Learnings</div>
              <p className="editorial mt-6 text-xl text-foreground">
                {projectDetail.learnings}
              </p>
            </div>
          </section>
        </div>

        {/* STACK */}
        <section className="container-editorial mt-20 mb-10 ">
          <div className="text-[#a3e635]">(03) — Stack</div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {projectDetail.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/80"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* HIGHLIGHTS */}
        <section className="container-editorial mt-20 mb-10 ">
          <div className="text-[#a3e635]">(04) — Highlights</div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
            {projectDetail.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
                className="rounded-xl bg-surface-muted px-4 py-4 text-sm text-foreground/85"
              >
                {h}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Pinned Horizontal Gallery Section (Screenshot 9) */}
        <>
          <div className="container-editorial mt-20 mb-10 text-[#a3e635]">
            (05) — Gallery
          </div>
          <section
            ref={triggerRef}
            className="relative h-screen w-full overflow-hidden bg-[#0d0d0f]"
          >
            {/* Horizontal Container scrolling right */}
            <div
              ref={scrollRef}
              className="absolute top-0 left-0 h-full flex items-center gap-12 pl-12 pr-0 select-none"
            >
              {/* Gallery Cards - dinámico según projectDetail.gallery */}
              {projectDetail.gallery.map((img, i) => (
                <div
                  key={i}
                  className="w-[480px] h-[580px] flex-shrink-0 flex flex-col justify-between p-10 bg-black rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 opacity-40">
                    <img
                      src={img}
                      alt={`${projectDetail.title} shot ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="w-full flex justify-between items-start z-10 text-[9px] font-space tracking-widest text-neutral-400">
                    <span>
                      EXP 0{i + 1} / {projectDetail.year}
                    </span>
                    <span className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center text-xs">
                      ●
                    </span>
                  </div>

                  <div className="z-10 text-left">
                    <h3 className="text-4xl font-extrabold mb-4 mt-4 font-korium tracking-wider text-white">
                      {projectDetail.title}
                    </h3>
                    <span className="text-[10px] font-space tracking-widest text-[#84cc16]">
                      {projectDetail.category?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}

              {/* Next Project Slider Panel */}
              <div
                onClick={() =>
                  nextProjectData
                    ? setPage(`/project/${nextProjectData.slug}`)
                    : setPage("/")
                }
                className="w-[100vw] h-full flex-shrink-0 bg-[#f0f0f5] text-black flex flex-col justify-between p-16 select-none relative overflow-hidden cursor-pointer"
                data-cursor="view"
              >
                {/* Decorative leaf shadow overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                  <svg
                    className="w-full h-full scale-150 origin-bottom-right rotate-45"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path d="M90 90 Q 70 80 50 60 T 10 10 Q 30 40 50 60 T 90 90 Z M80 70 Q 60 65 45 55 T 5 5 Z M60 50 Q 40 45 30 35 T 2 1 Z" />
                  </svg>
                </div>

                {/* Top: botón proyecto anterior o volver a listado */}
                <div className="z-10 flex justify-between items-start">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // evita que dispare el click del panel (que va al next)
                      if (prevProjectData) {
                        setPage(`/project/${prevProjectData.slug}`);
                      } else {
                        setPage("/projects");
                      }
                    }}
                    className="cursor-pointer inline-flex items-center gap-3 text-xs font-space font-bold tracking-widest text-neutral-800 hover:text-[#84cc16] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                    <span>
                      {prevProjectData
                        ? prevProjectData.title
                        : "Volver a Proyectos"}
                    </span>
                  </button>
                </div>

                {/* Giant Title + mini descripción + thumbnail del próximo proyecto */}
                {nextProjectData ? (
                  <div className="z-10 flex items-end justify-between gap-8 max-w-5xl">
                    <div className="text-left max-w-2xl">
                      <h2
                        ref={nextTitleRef}
                        className="text-7xl font-extrabold mb-4 mt-4 font-korium tracking-wider text-neutral-800 leading-none origin-left transition-transform duration-75"
                      >
                        {nextProjectData.title}
                      </h2>
                      <p className="editorial mt-6 text-lg md:text-xl text-neutral-600 max-w-xl">
                        {nextProjectData.summary}
                      </p>
                    </div>

                    {/* Thumbnail */}
                    <div className="hidden md:block w-48 h-60 flex-shrink-0 rounded-2xl overflow-hidden border border-black/10">
                      <img
                        src={nextProjectData.cover}
                        alt={nextProjectData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="z-10 text-left max-w-4xl">
                    <h2 className="text-7xl font-extrabold mb-4 mt-4 font-korium tracking-wider text-neutral-800 leading-none">
                      Eso es todo <br /> por ahora.
                    </h2>
                    <p className="editorial mt-6 text-lg md:text-xl text-neutral-600 max-w-2xl">
                      Pronto estaré cargando más proyectos, mientras tanto,
                      puedes explorar mi trabajo anterior o contactarme para
                      colaborar en tu próximo proyecto.{" "}
                    </p>
                  </div>
                )}

                {/* Next Project Link & Line Indicator */}
                <div className="w-full flex justify-between items-center z-10 border-t border-black/10 pt-8 mt-12 max-w-4xl">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-space font-bold tracking-widest text-neutral-800">
                      {nextProjectData ? "NEXT PROJECT" : "VOLVER AL INICIO"}
                    </span>
                    <div className="w-36 h-[2px] bg-neutral-300 relative overflow-hidden">
                      <div
                        ref={progressBarRef}
                        className="absolute inset-y-0 left-0 w-0 bg-[#84cc16]"
                      />
                    </div>
                  </div>

                  <svg
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </>
      </article>

      {/* Para sumarle:
    - Banner de tenes un proyecto similar 
    - links para el sitio o github repo 
    - data Project info Cliente, Empresa, Año, Tipo Landing inmobiliaria, Industria, Rol, Front-end Developer, Estado, Publicado, Equipo, UX/UI Project Manager · Frontend  */}
    </>
  );
}

export default ProjectDetailPage;
