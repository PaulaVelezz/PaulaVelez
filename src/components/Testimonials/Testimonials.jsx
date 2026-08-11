import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextRevealCurtain from "../common/TextRevealCurtain";
import { FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_DATA = [
  {
    id: 1,
    key: "motionDesign",
    author: "Elena Rostova",
    company: "Studio Luma",
    linkedin: "https://linkedin....",
    rating: "★★★★★",
  },
  {
    id: 2,
    key: "interactiveEngineering",
    author: "Marc Vanhoutte",
    company: "Lusion Systems",
    linkedin: "https://linkedin....",
    rating: "★★★★★",
  },
  {
    id: 3,
    key: "interactiveExcellence",
    author: "Sophia Alvarez",
    company: "Vertex Labs",
    linkedin: "https://linkedin....",
    rating: "★★★★★",
  },
  {
    id: 4,
    key: "responsiveExperience",
    author: "Kenji Sato",
    company: "Nippon Media",
    linkedin: "https://linkedin....",
    rating: "★★★★★",
  },
];

// Interactive 3D Magnetic Tilt Card Component
function TestimonialCard({ data }) {
  const cardRef = useRef(null);
  const { t } = useTranslation();

  // Motion values for tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Apply spring physics for smooth, organic drag lag and recovery
  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Magnetic depth parallax translate effects for inner elements
  const textTranslateX = useTransform(springRotateY, [-15, 15], [-8, 8]);
  const textTranslateY = useTransform(springRotateX, [-15, 15], [-8, 8]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Compute normalized mouse position inside card (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Map normalize coords to degree angles (tilt limits: 12 deg)
    rotateX.set(-y * 24);
    rotateY.set(x * 24);
  };

  const handleMouseLeave = () => {
    // Return smoothly to center resting state
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="testimonial-card flex-shrink-0 w-[340px] sm:w-[420px] h-[360px] bg-[#121316] border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group select-none hover:border-[#a3e635]/30 transition-colors cursor-grab active:cursor-grabbing"
      tabIndex={0} // support keyboard accessibility focus
      aria-label={`Testimonial from ${data.author} at ${data.company}`}
    >
      {/* Decorative Grid Lines within card */}
      <div className="absolute inset-0 grid grid-cols-3 pointer-events-none opacity-[0.02]">
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="h-full" />
      </div>

      {/* Top Bar Rating & Visual Accent */}
      <div
        className="flex justify-between items-center z-10"
        style={{ transform: "translateZ(10px)" }}
      >
        <span className="text-xs text-[#a3e635] font-space tracking-widest">
          {data.rating}
        </span>
        <span className="text-[10px] text-white/30 font-space tracking-widest">
          // 0{data.id}
        </span>
      </div>

      {/* Quote with parallax translation offset */}
      <motion.p
        style={{
          x: textTranslateX,
          y: textTranslateY,
          transform: "translateZ(30px)",
        }}
        className="text-base sm:text-lg text-white/90 font-grotesk italic leading-relaxed text-left z-10"
      >
        "{t(`testimonials.items.${data.key}.quote`)}"
      </motion.p>

      {/* Author details card base */}
      <div
        className="flex justify-between items-end border-t border-white/5 pt-6 z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-space font-bold text-white uppercase">
              {data.author}
            </h4>
            -
            <p className="text-[10px] text-white/40 uppercase tracking-wider">
              {t(`testimonials.items.${data.key}.role`)}
            </p>
          </div>

          <p className="text-[10px] text-[#a3e635] uppercase tracking-wider mt-1">
            {data.company}
          </p>
        </div>

        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("testimonials.linkedinLabel", {
            name: data.author,
          })}
          className="
            w-11
            h-11
            rounded-full
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:border-[#A3E635]
            hover:bg-[#A3E635]/10
            transition-all
            duration-300
            group
          "
        >
          <FaLinkedinIn className="text-lg text-white/60 group-hover:text-[#A3E635]" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Setup stagger reveals on scroll trigger
    gsap.fromTo(
      ".testimonial-card",
      { y: 80, opacity: 0, scale: 0.95, rotateY: -15 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      },
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const scrollEl = scrollRef.current;
      const containerEl = containerRef.current;
      if (!scrollEl || !containerEl) return;

      // Calculate drag constraints boundaries
      const scrollWidth = scrollEl.scrollWidth;
      const containerWidth = containerEl.offsetWidth;
      setMaxScroll(Math.max(0, scrollWidth - containerWidth + 48)); // 48px padding buffer
    };

    window.addEventListener("resize", handleResize);
    // Timeout buffer for layout rendering sync
    setTimeout(handleResize, 300);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0a0a0c] text-white py-24 md:py-36 z-10 overflow-hidden border-b border-white/5"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col gap-16 select-none">
        {/* Section Header Grid - Layout logic from 12_testimonies_section.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 text-left">
            <span className="text-[10px] text-[#a3e635] font-space tracking-[0.3em] block mb-3 uppercase">
              {t("testimonials.label")}
            </span>
            <TextRevealCurtain
              as="h2"
              className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider leading-none uppercase text-stone-100"
              lines={[t("testimonials.title")]}
            />
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs text-neutral-400 font-grotesk leading-relaxed max-w-sm ml-auto">
              {t("testimonials.description")}
            </p>
          </div>
        </div>

        {/* Draggable Testimonial Cards Carousel Row */}
        <div className="relative w-full overflow-visible">
          <motion.div
            ref={scrollRef}
            drag="x"
            dragConstraints={{ right: 0, left: -maxScroll }}
            dragElastic={0.15}
            className="flex gap-6 md:gap-8 pb-4"
          >
            {TESTIMONIALS_DATA.map((t) => (
              <TestimonialCard key={t.id} data={t} />
            ))}
          </motion.div>
        </div>

        {/* Carousel Drag Hint Navigation */}
        <div className="flex justify-between items-center text-[10px] font-space tracking-widest text-neutral-500 border-t border-white/5 pt-8">
          <span>[{t("testimonials.dragHint")}]</span>
          <span className="flex items-center gap-2">
            {t("testimonials.swipeHint")}
            <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-ping" />
          </span>
        </div>
      </div>
    </section>
  );
}
