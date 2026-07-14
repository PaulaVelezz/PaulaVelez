import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-1.5 top-0 z-40 hidden h-screen w-[3px] md:block"
    >
      {/* Track */}
      <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-white/10" />

      {/* Progress */}
      <motion.div
        style={{
          scaleY,
          transformOrigin: "top",
          background: "var(--gradient-brand)",
          boxShadow: "var(--shadow-glow)",
        }}
        className="absolute inset-y-8 left-0 w-full rounded-full"
      />
    </div>
  );
};

export default ScrollProgress;
