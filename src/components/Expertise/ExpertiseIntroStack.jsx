import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

function getFanTransform(index, total) {
  const mid = (total - 1) / 2;
  const distanceFromCenter = index - mid;
  const rotate = distanceFromCenter * 8;
  const offsetX = distanceFromCenter * 16;

  return { rotate, offsetX: `${offsetX}%` };
}

function ExpertiseIntroStack({ services, header, onViewMore }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const innerRefs = useRef([]);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);
  const baseRotations = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || cards.length === 0) return;

    const total = services.length;

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { backgroundColor: "#F0F0F5" });
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      cards.forEach((card) => {
        gsap.set(card, { y: "60vh", x: 0, rotate: 0, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 0.6,
        },
      });

      tl.to(
        headerRef.current,
        {
          y: "-22vh",
          scale: 0.75,
          opacity: 0.4,
          duration: 18,
          ease: "power1.inOut",
        },
        0,
      );

      cards.forEach((card, i) => {
        const { rotate, offsetX } = getFanTransform(i, total);
        baseRotations.current[i] = rotate;
        tl.to(
          card,
          {
            y: 0,
            x: offsetX,
            rotate,
            opacity: 1,
            duration: 25,
            ease: "power3.out",
          },
          12 + i * 5,
        );
      });

      tl.to(
        bgRef.current,
        { backgroundColor: "#070609", duration: 25, ease: "power2.inOut" },
        70,
      );
      tl.to(cards, { opacity: 0.85, duration: 25, ease: "power2.inOut" }, 70);
    }, section);

    return () => ctx.revert();
  }, [services]);

  const handleCardEnter = (i) => {
    const card = cardsRef.current[i];
    const inner = innerRefs.current[i];
    if (!card || !inner) return;

    card.style.zIndex = 100;

    gsap.to(inner, {
      y: -36,
      scale: 1.06,
      rotate: -baseRotations.current[i],
      boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleCardLeave = (i) => {
    const card = cardsRef.current[i];
    const inner = innerRefs.current[i];
    if (!card || !inner) return;

    gsap.to(inner, {
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        card.style.zIndex = i;
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div ref={bgRef} className="absolute inset-0" />

      <div
        ref={headerRef}
        className="absolute top-3 md:top-6 z-10 max-w-xl text-center px-6"
      >
        {header}
      </div>

      <div className="relative w-[300px] md:w-[340px] h-[440px] md:h-[480px] z-20">
        {services.map((service, i) => (
          <div
            key={service.title}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={() => handleCardLeave(i)}
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "bottom center", zIndex: i }}
          >
            <div
              ref={(el) => (innerRefs.current[i] = el)}
              className="relative w-full h-full rounded-3xl border border-black/10 bg-[#141416] overflow-hidden flex flex-col shadow-2xl cursor-pointer"
            >
              <span className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#A3E635] bg-[#A3E635]/10 hover:bg-[#A3E635] text-[12px] font-bold text-[#A3E635] font-space">
                {String(service.id).padStart(2, "0")}
              </span>

              <div className="p-5 flex-1 flex flex-col items-center justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="text-xl font-black text-white uppercase font-space mb-2">
                  {service.title}
                </h3>
                <p className="text-[13px] text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => onViewMore?.(service)}
                  className="w-full border-[#6d28d9] bg-[#6d28d9]/10 hover:bg-[#6d28d9] rounded-full border flex items-center justify-center gap-2 px-5 py-2 text-[12px] font-bold text-white transition-colors"
                  data-cursor="pointer"
                >
                  VIEW MORE
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExpertiseIntroStack;
