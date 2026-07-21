import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heights = [
  60, 74, 92, 112, 130, 152, 168, 184, 198, 210, 220, 214, 202, 186, 170, 150,
  130, 112, 90, 72, 58,
];

function ContactFooterVisual() {
  const container = useRef(null);
  const bars = useRef([]);

  useEffect(() => {
    bars.current.forEach((bar, index) => {
      gsap.fromTo(
        bar,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "none",

          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.8,
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div
      ref={container}
      className="relative h-[230px] overflow-hidden pointer-events-none"
    >
      {/* Glow */}

      <div
        className="
        absolute
        inset-x-0
        bottom-0
        h-40
        bg-gradient-to-t
        from-[#6d28d9]/20
        via-[#a3e635]/10
        to-transparent
        blur-3xl
      "
      />

      <div className="absolute inset-0 flex items-end">
        {heights.map((height, index) => (
          <div
            key={index}
            ref={(el) => (bars.current[index] = el)}
            style={{
              height,
            }}
            className="
              flex-1
              mx-[1px]
              rounded-t-md

              bg-gradient-to-t
              from-[#6d28d9]
              via-[#8b5cf6]
              to-[#a3e635]

              blur-[0.8px]

              shadow-[0_0_10px_rgba(163,230,53,.18),0_0_22px_rgba(109,40,217,.18)]

              will-change-transform
            "
          />
        ))}
      </div>
    </div>
  );
}

export default ContactFooterVisual;
