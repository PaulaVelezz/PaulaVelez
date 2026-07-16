// components/ExpertiseCardsStack.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [-3, 4, -5, 3];

function ExpertiseCardsStack({ services }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || cards.length === 0) return;

    const segmentLength = 500; // px de scroll que "dura" cada transición de card
    const overlap = 0.35; // qué tan superpuestas se ven entrada/salida (0-1)
    const totalScroll = (cards.length - 1) * segmentLength + 300;

    const ctx = gsap.context(() => {
      gsap.set(cards[0], {
        x: 0,
        rotate: ROTATIONS[0],
        scale: 1,
        opacity: 1,
        zIndex: 10,
      });
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], {
          x: "45%",
          rotate: ROTATIONS[i % ROTATIONS.length],
          scale: 0.92,
          opacity: 0,
          zIndex: 10 + i,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.6,
        },
      });

      for (let i = 1; i < cards.length; i++) {
        const segmentStart = (i - 1) * segmentLength;

        tl.to(
          cards[i],
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: segmentLength * (1 - overlap),
            ease: "power2.out",
          },
          segmentStart,
        );

        tl.to(
          cards[i - 1],
          {
            x: "-45%",
            scale: 0.9,
            opacity: 0,
            duration: segmentLength * (1 - overlap),
            ease: "power2.in",
          },
          segmentStart + segmentLength * overlap,
        );
      }
    }, section);

    return () => ctx.revert();
  }, [services]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full rounded-4xl overflow-hidden bg-[#0a0a0c] flex items-center justify-center"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        {[1, 2, 3, 4].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-white/20"
            style={{ width: `${r * 220}px`, height: `${r * 220}px` }}
          />
        ))}
      </div>

      <div className="relative w-[420px] h-[540px]">
        {services.map((service, i) => (
          <div
            key={service.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute inset-0 rounded-3xl border border-white/15 bg-[#141416] overflow-hidden flex flex-col will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-white/5 p-10">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(service.stack ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-bold tracking-wide text-white/50 border border-white/15 rounded-full px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white uppercase font-space">
                  {service.title}
                </h3>
                <span className="text-white/60 text-lg">🌐</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExpertiseCardsStack;
