import { useRef, useState, useMemo, useEffect } from "react";
import { gsap } from "gsap";
import { AnimatePresence } from "framer-motion";
import projectDetailData from "../data/ProjectDetailData.js";
import TextRevealCurtain from "../components/common/TextRevealCurtain.jsx";
import { getFilterOptions } from "../lib/getFilterOptions.js";
import FilterDropdown from "../components/Projects/FilterDropdown.jsx";
import ProjectCardSecondary from "../components/Projects/ProjectCardSecondary.jsx";

const ProjectsPage = ({ setPage }) => {
  const containerRef = useRef(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeTypes, setActiveTypes] = useState([]);
  const [activeStack, setActiveStack] = useState([]);

  const { categories, types, stack } = useMemo(
    () => getFilterOptions(projectDetailData),
    [],
  );

  const filteredProjects = useMemo(() => {
    return projectDetailData.filter((project) => {
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.some((c) => project.categories.includes(c));

      const matchesType =
        activeTypes.length === 0 ||
        activeTypes.some((t) => project.projectType.includes(t));

      const matchesStack =
        activeStack.length === 0 ||
        activeStack.some((s) => project.stack.includes(s));

      return matchesCategory && matchesType && matchesStack;
    });
  }, [activeCategories, activeTypes, activeStack]);

  const hasActiveFilters =
    activeCategories.length > 0 ||
    activeTypes.length > 0 ||
    activeStack.length > 0;

  const clearAll = () => {
    setActiveCategories([]);
    setActiveTypes([]);
    setActiveStack([]);
  };

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
        {/* Headline + Filters Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 select-none">
          <div className="lg:col-span-8">
            <TextRevealCurtain
              as="h2"
              className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider leading-[0.9] text-[#0a0a0c] uppercase"
              lines={["SELECTED WORK"]}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <FilterDropdown
                label="CATEGORÍA"
                options={categories}
                selected={activeCategories}
                onChange={setActiveCategories}
              />
              <FilterDropdown
                label="TIPO"
                options={types}
                selected={activeTypes}
                onChange={setActiveTypes}
              />
              <FilterDropdown
                label="STACK"
                options={stack}
                selected={activeStack}
                onChange={setActiveStack}
              />
            </div>

            {/* Filtros activos */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {[...activeCategories, ...activeTypes, ...activeStack].map(
                  (filter) => (
                    <span
                      key={filter}
                      className="flex items-center gap-1.5 rounded-full bg-[#84CC16] px-3 py-1 text-[11px] font-bold text-black"
                    >
                      {filter}
                    </span>
                  ),
                )}
                <button
                  onClick={clearAll}
                  className="ml-1 text-[11px] text-black/50 underline hover:text-black"
                  data-cursor="pointer"
                >
                  Limpiar todo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nota sobre trabajo en agencia */}
        <div className="grid grid-cols-1 gap-8">
          <aside className="max-w-3xl border-l border-violet pl-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="text-accent font-bold">Nota:</span> Algunos de
              estos proyectos fueron desarrollados como parte de mi trabajo en
              una agencia digital. Colaborando de cerca con equipos de diseño,
              UX/UI y Project Management, además de participar en reuniones
              directas con clientes para entender bien la necesidad detrás de
              cada desarrollo.
            </p>
          </aside>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pl-10 pr-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCardSecondary
              key={project.id}
              project={project}
              setPage={setPage}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="max-w-7xl mx-auto w-full pl-10 pr-10 mt-10 text-center text-black/40">
          No hay proyectos que coincidan con estos filtros.
        </div>
      )}
    </div>
  );
};
export default ProjectsPage;
