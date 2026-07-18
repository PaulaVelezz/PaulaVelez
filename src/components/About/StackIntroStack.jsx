import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getFanTransform(index, total) {
  const mid = (total - 1) / 2;
  const distanceFromCenter = index - mid;
  const rotate = distanceFromCenter * 8;
  const offsetX = distanceFromCenter * 26;
  return { rotate, offsetX: `${offsetX}%` };
}

function StackIntroStack({ stacks, header }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const innerRefs = useRef([]);
  const bgRef = useRef(null);
  const baseRotations = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || cards.length === 0) return;

    const total = stacks.length;

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
          end: "+=3200",
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
          duration: 15,
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
            duration: 22,
            ease: "power3.out",
          },
          10 + i * 6,
        );
      });
      tl.addLabel("fanComplete");

      tl.to({}, { duration: 15 }, "fanComplete");
      tl.addLabel("startExit");

      cards.forEach((card, i) => {
        tl.to(
          card,
          { y: "40vh", opacity: 0, duration: 15, ease: "power2.in" },
          `startExit+=${i * 3}`,
        );
      });

      tl.to(
        bgRef.current,
        { backgroundColor: "#0A0A0C", duration: 20, ease: "power2.inOut" },
        "startExit+=10",
      );
    }, section);

    return () => ctx.revert();
  }, [stacks]);

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
        className="absolute top-20 md:top-28 z-10 max-w-xl text-center px-6"
      >
        {header}
      </div>

      <div className="relative w-[320px] md:w-[360px] h-[460px] md:h-[520px] z-20">
        {stacks.map((stackItem, i) => (
          <div
            key={stackItem.category}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={() => handleCardLeave(i)}
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "bottom center", zIndex: i }}
          >
            <div
              ref={(el) => (innerRefs.current[i] = el)}
              className="relative w-full h-full rounded-3xl border border-black/10 bg-[#141416] overflow-hidden flex flex-col shadow-2xl cursor-pointer p-6"
            >
              <span className="absolute top-5 right-5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#A3E635] bg-[#A3E635]/10 hover:bg-[#A3E635] text-[12px] font-bold text-[#A3E635] font-space">
                {String(stackItem.id).padStart(2, "0")}
              </span>

              <h3 className="text-2xl font-black text-white uppercase font-space mb-1.5 pr-10">
                {stackItem.category}
              </h3>
              <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                {stackItem.subtitle}
              </p>

              <ul className="flex-1 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
                {stackItem.tools.map((tool, toolIndex) => (
                  <li
                    key={tool}
                    className="flex items-center gap-3 text-[12px] text-white/75 font-space"
                  >
                    <span className="text-[#6d28d9] font-bold text-[10px] w-5">
                      {String(toolIndex + 1).padStart(2, "0")}
                    </span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StackIntroStack;
