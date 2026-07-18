import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ExperienceTimeline({ experiences, header }) {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        },
      );

      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%", once: true },
          },
        );
      });

      cardsRef.current.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          toggleClass: { targets: card, className: "is-active" },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0c] py-32 px-6 md:px-12"
    >
      <div className="text-center mb-20">{header}</div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-[29px] top-2 bottom-2 w-[2px] bg-white/8" />
        <div
          ref={lineRef}
          className="absolute left-[29px] top-2 w-[2px] bg-gradient-to-b from-[#a3e635] to-[#6d28d9]"
          style={{ height: "0%" }}
        />

        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            ref={(el) => (itemsRef.current[i] = el)}
            className="flex gap-7 mb-14 last:mb-0 will-change-transform"
          >
            <div className="flex-shrink-0 w-[60px] flex justify-center">
              <div
                className={`w-4 h-4 rounded-full mt-1.5 ${
                  i === 0
                    ? "bg-[#a3e635] shadow-[0_0_0_5px_rgba(163,230,53,0.15)]"
                    : "bg-[#141416] border-2 border-[#6d28d9]"
                }`}
              />
            </div>

            <div
              ref={(el) => (cardsRef.current[i] = el)}
              className="experience-card flex-1 rounded-2xl p-6 md:p-7"
            >
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                <h3 className="text-lg md:text-xl font-black text-white">
                  {exp.company}
                </h3>
                <span
                  className={`text-[10px] font-bold tracking-wider ${
                    i === 0 ? "text-[#a3e635]" : "text-white/40"
                  }`}
                >
                  {exp.period}
                </span>
              </div>

              <div className="flex justify-between items-center flex-wrap gap-1 mb-4">
                <span className="text-xs text-white/50">{exp.role}</span>
                <span className="text-[10px] text-white/35">
                  {exp.location}
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="flex gap-2.5 text-sm text-white/70 leading-relaxed"
                  >
                    <span className="text-[#a3e635] mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-[#a3e635]" />
                    {task}
                  </li>
                ))}
              </ul>

              {exp.stack && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-bold text-white/60 border border-white/15 rounded-full px-2.5 py-1"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceTimeline;
