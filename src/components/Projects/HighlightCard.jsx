import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// const PALETTE = [
//   { bg: "#d6bcff", text: "#0a0a0c" },
//   { bg: "#a855f7", text: "#0a0a0c" },
//   { bg: "#7c3aed", text: "#ffffff" },
//   { bg: "#6d28d9", text: "#ffffff" },
// ];

function HighlightCard({ text }) {
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spring = {
    damping: 20,
    stiffness: 120,
    mass: 0.45,
  };

  const springRotateX = useSpring(rotateX, spring);
  const springRotateY = useSpring(rotateY, spring);

  const textX = useTransform(springRotateY, [-15, 15], [-6, 6]);
  const textY = useTransform(springRotateX, [-15, 15], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rotateX.set(-y * 18);
    rotateY.set(x * 18);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="
        relative
        h-full
        rounded-2xl
        border
        border-white/5
        bg-[#121316]
        p-3
        overflow-hidden
        group
        transition-colors
        hover:border-[#6D28D9]/40
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#6D28D9]/10
          via-transparent
          to-[#A855F7]/5
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
      />
      <motion.p
        style={{
          x: textX,
          y: textY,
          transform: "translateZ(40px)",
        }}
        className="
          text-base
          leading-relaxed
          font-grotesk
          text-white/90
          max-w-[90%]
          text-center
        "
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

export default HighlightCard;
