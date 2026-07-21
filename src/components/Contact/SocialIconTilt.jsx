import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function SocialIconTilt({ href, onClick, label, icon: Icon, external = true }) {
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spring = { damping: 20, stiffness: 150, mass: 0.4 };
  const springRotateX = useSpring(rotateX, spring);
  const springRotateY = useSpring(rotateY, spring);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 16);
    rotateY.set(x * 16);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Wrapper = onClick ? motion.button : motion.a;
  const wrapperProps = onClick
    ? { onClick }
    : {
        href,
        target: external ? "_blank" : undefined,
        rel: external ? "noreferrer" : undefined,
      };

  return (
    <Wrapper
      {...wrapperProps}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      aria-label={label}
      data-cursor="pointer"
      className="text-center group relative w-full aspect-square rounded-2xl border border-white/10 bg-[#0d0d0f] overflow-hidden flex flex-col items-center justify-center gap-1.5 hover:border-[#6D28D9]/40 transition-colors"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(163,230,53,.12), transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
        }}
      />

      <span
        style={{ transform: "translateZ(24px)" }}
        className="relative text-white/60 group-hover:text-white transition-colors"
      >
        <Icon className="w-6 h-6" />
      </span>
      <span
        style={{ transform: "translateZ(20px)" }}
        className="relative text-[12px] text-white/35 group-hover:text-white/60 font-space tracking-wide transition-colors mt-1"
      >
        {label}
      </span>
    </Wrapper>
  );
}

export default SocialIconTilt;
