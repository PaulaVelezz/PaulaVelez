import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

const PALETTE = ["#f5f5f5", "#6d28d9", "#a3e635"];

const PageTransitionOverlay = forwardRef(
  function PageTransitionOverlay(_, ref) {
    const barsRef = useRef([]);

    useImperativeHandle(ref, () => ({
      cover: () =>
        new Promise((resolve) => {
          gsap.set(barsRef.current, { transformOrigin: "left center" });
          gsap.to(barsRef.current, {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.inOut",
            onComplete: resolve,
          });
        }),
      reveal: () =>
        new Promise((resolve) => {
          gsap.set(barsRef.current, { transformOrigin: "right center" });
          gsap.to(barsRef.current, {
            scaleX: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.inOut",
            onComplete: resolve,
          });
        }),
    }));

    return (
      <div
        className="pointer-events-none fixed inset-0 z-[999]"
        aria-hidden="true"
      >
        {PALETTE.map((color, i) => (
          <div
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{
              backgroundColor: color,
              transform: "scaleX(1)",
              transformOrigin: "right center",
              zIndex: PALETTE.length - i,
            }}
          />
        ))}
      </div>
    );
  },
);

export default PageTransitionOverlay;
