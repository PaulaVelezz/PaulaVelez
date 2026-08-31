import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import projectDetailData from "../data/ProjectDetailData.js";
import { Link } from "react-router-dom";
import TextRevealCurtain from "../components/common/TextRevealCurtain.jsx";
import HighlightCard from "../components/Projects/HighlightCard.jsx";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiFigma,
  FiExternalLink,
} from "react-icons/fi";
import darkbg from "../assets/darkbg.webp";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const projectLinks = [
  {
    key: "live",
    label: "Live Demo",
    icon: <FiExternalLink />,
    className:
      "border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] hover:bg-[#A3E635] hover:text-black",
  },
  {
    key: "github",
    label: "GitHub Repository",
    icon: <FiGithub />,
    className:
      "border-white/10 bg-white/5 text-white hover:border-[#6d28d9] hover:bg-[#6d28d9]/20",
  },
  {
    key: "figma",
    label: "Figma File",
    icon: <FiFigma />,
    className:
      "border-white/10 bg-white/5 text-white hover:border-[#6d28d9] hover:bg-[#6d28d9]/20",
  },
];

function ProjectDetailPage({ setPage }) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollRef = useRef(null);

  const progressBarRef = useRef(null);
  const nextTitleRef = useRef(null);
  const transitionTriggered = useRef(false);

  const projectCardRef = useRef(null);
  const overviewRef = useRef(null);
  const challengeRef = useRef(null);
  const heroRowRef = useRef(null);
  const linksRef = useRef(null);

  const { t } = useTranslation();
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

  const projectText = t(`project.${projectDetail.id}`, {
    returnObjects: true,
  });

  // Horizontal Scroll Pinning (GSAP ScrollTrigger)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const triggerElement = triggerRef.current;
    if (!scrollContainer || !triggerElement) return;

    window.scrollTo(0, 0);
    transitionTriggered.current = false;

    const calculateScrollWidth = () => {
      return -(scrollContainer.scrollWidth - window.innerWidth);
    };

    // Extra scroll depth for filling progress loader at the end
    const extraScroll = 900;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

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
  }, [setPage, slug, nextProjectData]);

  useEffect(() => {
    if (!projectCardRef.current || !heroRowRef.current || !linksRef.current) {
      return;
    }

    const st = ScrollTrigger.create({
      trigger: heroRowRef.current,
      start: "top top+=120",
      endTrigger: linksRef.current,
      end: "bottom bottom",
      pin: projectCardRef.current,
      pinSpacing: false,
    });

    return () => st.kill();
  }, [slug]);

  return (
    <>
      <article>
        <div
          ref={containerRef}
          className="relative w-full z-10 bg-[#0a0a0c] text-white"
        >
          {/* HERO */}
          <header className="relative pt-32 pb-14">
            <div className="container-editorial">
              <div
                ref={heroRowRef}
                className="grid grid-cols-12 gap-20 items-start"
              >
                {/* LEFT COLUMN */}
                <div className="col-span-12 lg:col-span-7">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-[#A3E635] transition-colors"
                  >
                    ← {t("projects_selected.detail.back")}
                  </Link>

                  <TextRevealCurtain
                    as="h1"
                    className="mt-10 text-5xl md:text-7xl xl:text-8xl font-korium font-extrabold tracking-wider leading-[0.9]"
                    lines={[projectDetail.title]}
                  />

                  <p className="mt-10  md:max-w-3xl max-w-md md:text-xl text-sm leading-relaxed text-white/80">
                    {projectText.summary}
                  </p>

                  {/* Overview */}
                  <section
                    ref={overviewRef}
                    className="mt-20 md:max-w-5xl max-w-md"
                  >
                    <span className="text-[#A3E635] text-sm tracking-[0.2em] uppercase">
                      (00) — {t("projects_selected.detail.overview")}
                    </span>

                    <p className="editorial mt-8 md:text-xl text-sm leading-relaxed text-white/90">
                      {projectText.overview}
                    </p>
                  </section>

                  {/* Links */}
                  <section ref={linksRef} className="mt-16 max-w-5xl">
                    <span className="text-[#A3E635] text-sm tracking-[0.2em] uppercase">
                      (01) — {t("projects_selected.detail.links")}
                    </span>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {projectLinks.map((link) => {
                        const url = projectDetail.links?.[link.key];

                        if (!url) return null;

                        return (
                          <a
                            key={link.key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                              inline-flex
                              items-center
                              gap-2
                              rounded-full
                              border
                              px-5
                              py-2.5
                              text-xs
                              font-space
                              font-bold
                              tracking-[0.18em]
                              uppercase
                              transition-all
                              ${link.className}
                            `}
                          >
                            {link.label}
                            {link.icon}
                          </a>
                        );
                      })}
                    </div>
                  </section>
                </div>

                {/* RIGHT COLUMN */}
                <aside className="col-span-12 lg:col-span-5">
                  <div className="max-w-[430px]" ref={projectCardRef}>
                    <div
                      className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        backdrop-blur-xl
                        overflow-hidden
                      "
                    >
                      {/* Header */}
                      <div className="px-2 pt-2 pb-2 text-center bg-[#6d28d9]/20 border-b border-white/10">
                        <span className="text-[12px] uppercase tracking-[0.35em] font-extrabold text-[#6d28d9]">
                          {t("projects_selected.detail.info")}
                        </span>
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-2">
                        <div className="border-r border-b border-white/10 p-4 pt-6">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3E635] mb-3">
                            {t("projects_selected.detail.fields.category")}
                          </p>

                          <p className="text-white text-sm font-medium leading-relaxed">
                            {projectText.projectType?.join(" / ")}
                          </p>
                        </div>

                        <div className="border-b border-white/10 p-4">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3E635] mb-3">
                            {t("projects_selected.detail.fields.year")}
                          </p>

                          <p className="text-white text-sm font-medium">
                            {projectDetail.year}
                          </p>
                        </div>

                        <div className="border-r border-white/10 p-4">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3E635] mb-3">
                            {t("projects_selected.detail.fields.role")}
                          </p>

                          <p className="text-white text-sm font-medium leading-relaxed">
                            {Array.isArray(projectDetail.role)
                              ? projectDetail.role.map((role, index) => (
                                  <span key={role}>
                                    {index > 0 && <br />}
                                    {role}
                                  </span>
                                ))
                              : projectDetail.role}
                          </p>
                        </div>

                        <div className="p-4">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3E635] mb-3">
                            {t("projects_selected.detail.fields.client")}
                          </p>

                          <p className="text-white text-sm font-medium">
                            {t(
                              "projects_selected.detail.fields.clientDescription",
                            )}
                            <br />
                            {projectDetail.client}
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="border-t border-white/10 p-6">
                        <h3 className="font-grotesk font-bold tracking-tighter text-xl mb-4">
                          {t("projects_selected.detail.cta.title")}
                        </h3>

                        <p className="text-sm leading-relaxed text-white/60">
                          {t("projects_selected.detail.cta.description")}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 text-sm">
                          <div className="flex gap-4 text-white/40 text-sm">
                            <a
                              href="mailto:velezpaula.a@gmail.com"
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="pointer"
                              aria-label="Email"
                            >
                              <FiMail className="hover:text-[#A3E635] transition-colors" />
                            </a>
                            <a
                              href="https://github.com/PaulaVelezz"
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="pointer"
                              aria-label="GitHub"
                            >
                              <FiGithub className="hover:text-[#A3E635] transition-colors" />
                            </a>
                            <a
                              href="https://linkedin.com/in/paula-velez/"
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="pointer"
                              aria-label="LinkedIn"
                            >
                              <FiLinkedin className="hover:text-[#A3E635] transition-colors" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </header>

          {/* CHALLENGE / LEARNINGS */}
          <section
            ref={challengeRef}
            className="container-editorial mb-10 mt-10 grid grid-cols-12 gap-10"
          >
            <div className="col-span-12 md:col-span-6">
              <div className="text-[#a3e635]">
                (02) — {t("projects_selected.detail.sections.challenge")}
              </div>
              <p className="editorial mt-6 md:text-xl text-sm text-foreground leading-relaxed">
                {projectText.challenge}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="text-[#a3e635]">
                (03) — {t("projects_selected.detail.sections.learnings")}
              </div>
              <p className="editorial mt-6 md:text-xl text-sm text-foreground leading-relaxed">
                {projectText.learnings}
              </p>
            </div>
          </section>
        </div>

        {/* STACK */}
        <section className="container-editorial mt-20 mb-10 ">
          <div className="text-[#a3e635]">
            (04) — {t("projects_selected.detail.sections.stack")}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {projectDetail.stack.map((s) => (
              <li
                key={s}
                className="border-[#6d28d9] bg-[#6d28d9]/10 hover:bg-[#6d28d9] rounded-full border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/80"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* HIGHLIGHTS */}
        <section className="container-editorial mt-20">
          <div className="text-[#a3e635]">
            (05) — {t("projects_selected.detail.sections.highlights")}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
            {projectText.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.05,
                }}
              >
                <HighlightCard text={h} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Pinned Horizontal Gallery Section (Screenshot 9) */}
        <>
          <div className="container-editorial mt-14 mb-10 text-[#a3e635]">
            (06) — {t("projects_selected.detail.sections.gallery")}
          </div>
          <section
            ref={triggerRef}
            className="relative h-screen w-full overflow-hidden bg-[#0a0a0c]"
          >
            {/* Horizontal Container scrolling right */}
            <div
              ref={scrollRef}
              className="absolute top-0 left-0 h-full flex items-center gap-4 pl-12 pr-0 select-none"
            >
              {/* Gallery Cards - dinámico según projectDetail.gallery */}
              {projectDetail.gallery.map((img, i) => (
                <div
                  key={i}
                  className="
                    group
                    w-[520px]
                    h-[620px]
                    flex-shrink-0
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-white/5
                    shadow-2xl
                  "
                >
                  {/* Frame */}
                  <img
                    src={darkbg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  {/* Header */}
                  <div className="absolute top-10 left-10 right-10 z-20 flex justify-between items-start text-[9px] font-space tracking-widest text-neutral-400">
                    <span>
                      EXP 0{i + 1} / {projectDetail.year}
                    </span>
                  </div>

                  {/* Screenshot */}
                  <div
                    className="
                      absolute
                      left-[9%]
                      top-[15%]
                      w-[82%]
                      h-[63%]
                      overflow-hidden
                      rounded-2xl
                      z-10
                    "
                  >
                    <img
                      src={img}
                      alt={`${projectDetail.title} shot ${i + 1}`}
                      className="
                        w-full
                        h-auto
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-10 left-10 right-10 z-20">
                    <h3 className="text-4xl font-extrabold mb-3 font-korium tracking-wider text-white">
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
                className="w-[100vw] h-[calc(100dvh-80px)] mt-[80px] flex-shrink-0 bg-[#f0f0f5] text-black flex flex-col justify-between p-16 select-none relative overflow-hidden cursor-pointer"
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
                      e.stopPropagation();
                      if (prevProjectData) {
                        setPage(`/project/${prevProjectData.slug}`);
                      } else {
                        setPage("/projects");
                      }
                    }}
                    className="cursor-pointer inline-flex items-center gap-3 text-[13px] font-space font-bold tracking-widest text-neutral-800 hover:text-[#84cc16] transition-colors"
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
                  <div className="z-10 flex items-end justify-between gap-8 max-w-6xl">
                    <div className="text-left max-w-2xl">
                      <h2
                        ref={nextTitleRef}
                        className="text-5xl md:text-7xl font-extrabold mb-4 mt-6 font-korium tracking-wider text-neutral-800 leading-none origin-left transition-transform duration-75"
                      >
                        {nextProjectData.title}
                      </h2>
                      <p className="editorial mt-6 md:text-[18px] text-base text-neutral-600 max-w-xl">
                        {t(`project.${nextProjectData.id}.summary`)}
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
                      {t("projects_selected.detail.end.title")}
                    </h2>
                    <p className="editorial mt-6 text-lg md:text-xl text-neutral-600 max-w-2xl">
                      {t("projects_selected.detail.end.description")}
                    </p>
                  </div>
                )}

                {/* Next Project Link & Line Indicator */}
                <div className="w-full flex justify-between items-center z-10 border-t border-black/10 pt-8 mt-12 max-w-6xl">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-space font-bold tracking-widest text-neutral-800">
                      {nextProjectData
                        ? t("projects_selected.detail.navigation.nextProject")
                        : t("projects_selected.detail.navigation.backToHome")}
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
    </>
  );
}

export default ProjectDetailPage;
