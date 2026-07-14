import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import abstractBg from "../../assets/abstract-6.webp";
import devinImg from "../../assets/devin_project.png";
import fluidImg from "../../assets/fluid_project.png";
import { SERVICES, openWhatsApp } from "../../services/whatsAppService.js";

// Mini Animated ASCII (for Home Visual Fragment)
function MiniAsciiGrid() {
  const [grid, setGrid] = useState([]);
  const cols = 20;
  const rows = 10;
  const chars = "vczXYUJQLOZdhbka*M#w+-?10{}[]()/|\\".split("");

  useEffect(() => {
    // Generate initial grid
    const generate = () => {
      const tempGrid = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        tempGrid.push(row);
      }
      setGrid(tempGrid);
    };

    generate();
    const interval = setInterval(generate, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="font-grotesk text-[7px] leading-none tracking-widest text-[#A3E635] opacity-40 select-none">
      {grid.map((row) => row.join("")).join("\n")}
    </pre>
  );
}

export default function HamburgerMenu({ isOpen, setPage, onClose }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const linksRef = useRef([]);
  const previewRef = useRef(null);
  const metaRef = useRef(null);
  const contactService = SERVICES.find((s) => s.id === "portfolio-contact");

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [displayItem, setDisplayItem] = useState(null);

  const menuItems = [
    {
      label: "Home",
      page: "/",
      number: "01",
      preview: {
        title: "Paula Velez",
        subtitle: "Creative Technology Studio",
        category: "Interactive / code",
        description:
          "Interactive frontend engineer sculpting hardware accelerated interfaces.",
        type: "home",
      },
    },
    {
      label: "Projects",
      page: "/projects",
      number: "02",
      preview: {
        title: "Selected Works",
        subtitle: "Case Archive (12)",
        category: "WebGL / GLSL Shaders",
        description:
          "A curation of hardware-accelerated frontend experiments and custom shader loops.",
        type: "projects",
      },
    },
    {
      label: "Services",
      page: "/services",
      number: "03",
      preview: {
        title: "Expertise Deck",
        subtitle: "Area of Expertise",
        category: "Creative / Development",
        description:
          "Concept strategy, WebGL performance audits, and high-fidelity motion systems.",
        type: "services",
      },
    },
    {
      label: "About",
      page: "about",
      number: "04",
      preview: {
        title: "Our Philosophy",
        subtitle: "Studio Mission Brief",
        category: "Design / Motion",
        description:
          "Bridging the gap between conceptual design boundaries and technical frontend math.",
        type: "about",
      },
    },
    {
      label: "Contact",
      page: "/contact",
      number: "05",
      preview: {
        title: "Get In Touch",
        subtitle: "Open for Inquiries",
        category: "Córdoba Capital / Remote",
        description:
          "Available for freelance projects, technical consulting, and creative collaborations.",
        type: "contact",
      },
    },
  ];

  useEffect(() => {
    setActiveItem(menuItems[0]);
    setDisplayItem(menuItems[0]);
  }, []);

  useEffect(() => {
    if (hoveredIdx !== null) {
      setActiveItem(menuItems[hoveredIdx]);
    }
  }, [hoveredIdx]);

  useEffect(() => {
    const card = previewRef.current;
    if (!card || !activeItem) return;

    const tl = gsap.timeline();
    tl.to(card, {
      opacity: 0,
      scale: 0.96,
      y: 8,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setDisplayItem(activeItem);
      },
    }).to(card, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [activeItem]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus within menu when open
  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, a, [tabIndex="0"]',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleFocusTrap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleFocusTrap);
    if (firstElement) firstElement.focus();

    return () => container.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const links = linksRef.current.filter(Boolean);
    const preview = previewRef.current;
    const meta = metaRef.current;

    if (!container || !bg) return;

    if (isOpen) {
      gsap.set(container, { pointerEvents: "all", visibility: "visible" });

      // Initial states
      gsap.set(bg, { opacity: 0, scale: 1.05 });
      gsap.set(links, { y: 60, opacity: 0 });
      if (preview) gsap.set(preview, { opacity: 0, scale: 0.95, y: 15 });
      if (meta) gsap.set(meta, { opacity: 0, y: 20 });

      const tl = gsap.timeline();
      tl.to(bg, {
        opacity: 0.25,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      })
        .to(
          links,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.65",
        )
        .to(
          [preview, meta],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.45",
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { pointerEvents: "none", visibility: "hidden" });
          setHoveredIdx(null);
        },
      });

      tl.to(links, {
        y: -40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.in",
      })
        .to(
          [preview, meta],
          {
            opacity: 0,
            y: -15,
            scale: 0.97,
            duration: 0.35,
            ease: "power2.in",
          },
          "-=0.3",
        )
        .to(
          bg,
          {
            opacity: 0,
            scale: 1.05,
            duration: 0.5,
            ease: "power3.in",
          },
          "-=0.25",
        );
    }
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (!bgRef.current) return;
    const { clientX, clientY } = e;
    const xOffset = (clientX / window.innerWidth - 0.5) * 35;
    const yOffset = (clientY / window.innerHeight - 0.5) * 35;

    gsap.to(bgRef.current, {
      x: xOffset,
      y: yOffset,
      duration: 1.0,
      ease: "power2.out",
    });
  };

  const handleLinkClick = (page) => {
    setPage(page);
    onClose();
  };

  const renderVisualFragment = (type) => {
    switch (type) {
      case "home":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden text-left">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-space tracking-widest text-[#A3E635] uppercase">
                // Studio Core
              </span>
              <span className="text-[10px] text-white/20 font-space font-bold">
                2026
              </span>
            </div>

            <div className="my-auto z-10">
              <h4 className="text-xl sm:text-2xl font-syne font-black tracking-tight text-white leading-[1.1]">
                Interactive code. <br />
                <span className="text-[#A3E635]">Sensory logic.</span>
              </h4>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none opacity-40">
              <MiniAsciiGrid />
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
              <span>PROJECTS INDEX (12)</span>
              <span className="text-[#A3E635]">SELECTED CASE STUDIES</span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-auto z-10">
              <div className="group/mini relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={devinImg}
                  alt="Devin Platform mini"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-[#6D28D9]/20 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="group/mini relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={fluidImg}
                  alt="Fluid dynamics mini"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-[#A3E635]/20 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-space text-white/40 tracking-wider">
              <span>DEVIN PLATFORM</span>
              <span>FLUID VECTOR FIELD</span>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-space tracking-widest text-[#A3E635] uppercase">
                // EXPERTISE DECK
              </span>
              <span className="text-[9px] font-space text-white/30">
                S C T P STACK
              </span>
            </div>

            <div className="relative w-full h-24 my-auto flex items-center justify-center">
              {["S", "C", "T", "P"].map((letter, index) => {
                const rot = (index - 1.5) * 8;
                const xShift = (index - 1.5) * 35;
                return (
                  <div
                    key={letter}
                    style={{
                      transform: `translateX(${xShift}px) rotate(${rot}deg)`,
                      zIndex: index,
                    }}
                    className="absolute w-14 h-20 bg-[#0d0d0f] border border-white/15 rounded-md flex flex-col justify-between p-2 shadow-lg hover:border-[#A3E635] transition-colors duration-300"
                  >
                    <span className="text-[8px] font-space font-bold text-white/30 text-left">
                      {letter}
                    </span>
                    <span className="text-xs font-syne font-black text-[#A3E635] text-center">
                      {letter}
                    </span>
                    <span className="text-[8px] font-space font-bold text-white/30 text-right rotate-180">
                      {letter}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[9px] font-space text-center text-white/45 tracking-widest uppercase">
              STRATEGY // CREATIVE // TECH // PRODUCTION
            </div>
          </div>
        );

      case "about":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
              <span>PHILOSOPHY INDEX</span>
              <span className="text-[#6D28D9]">STUDIO METRICS</span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-auto z-10 border-y border-white/5 py-4">
              <div>
                <span className="block text-2xl font-syne font-black text-white leading-none">
                  5+
                </span>
                <span className="text-[8px] font-space text-white/40 uppercase tracking-widest leading-none">
                  Years Exp
                </span>
              </div>
              <div>
                <span className="block text-2xl font-syne font-black text-[#A3E635] leading-none">
                  50+
                </span>
                <span className="text-[8px] font-space text-white/40 uppercase tracking-widest leading-none">
                  Projects
                </span>
              </div>
              <div>
                <span className="block text-2xl font-syne font-black text-white leading-none">
                  20+
                </span>
                <span className="text-[8px] font-space text-white/40 uppercase tracking-widest leading-none">
                  Clients
                </span>
              </div>
            </div>

            <div className="text-[9px] font-space text-white/40 tracking-wider">
              CÓRDOBA CAPITAL // REMOTE
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
              <span>COMMUNICATION CHANNEL</span>
              <span className="text-[#A3E635] animate-pulse">● SECURE</span>
            </div>

            <div className="my-auto z-10">
              <span className="text-[8px] font-space tracking-widest text-white/30 block uppercase mb-1">
                email address
              </span>
              <a
                href="mailto:velezpaula.a@gmail.com"
                className="text-lg sm:text-xl font-space font-bold text-white hover:text-[#A3E635] transition-colors underline decoration-1 underline-offset-4"
              >
                velezpaula.a@gmail.com
              </a>
            </div>

            <div className="flex gap-4 text-white/40 text-xs">
              <a
                href="https://github.com/PaulaVelezz"
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                aria-label="GitHub"
              >
                <FiGithub className="hover:text-[#A3E635] transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/paula-velez/"
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="hover:text-[#A3E635] transition-colors" />
              </a>
              <button
                onClick={() => openWhatsApp(contactService)}
                data-cursor="pointer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="hover:text-[#A3E635] transition-colors" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-30 invisible pointer-events-none overflow-hidden bg-[#050505] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-expanded={isOpen}
      aria-label="Navigation Overlay Menu"
    >
      <img
        ref={bgRef}
        src={abstractBg}
        alt="Atmospheric abstract texture"
        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] object-cover opacity-20 pointer-events-none select-none blur-md scale-105"
      />

      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.02] z-0">
        <div className="col-span-4 border-r border-white h-full" />
        <div className="col-span-4 border-r border-white h-full" />
        <div className="col-span-4 h-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-[70vh] z-10 relative select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
          <nav className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-[10px] font-space tracking-[0.3em] text-[#A3E635] uppercase font-bold">
              // NAVIGATION
            </span>

            <div className="flex flex-col gap-1 sm:gap-2">
              {menuItems.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const isSibling = hoveredIdx !== null && hoveredIdx !== idx;

                return (
                  <div key={item.label} className="overflow-hidden">
                    <button
                      ref={(el) => (linksRef.current[idx] = el)}
                      onClick={() => handleLinkClick(item.page)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="group flex items-baseline gap-4 cursor-pointer py-1 bg-transparent border-none text-left focus:outline-none w-full transition-transform duration-300"
                      tabIndex={isOpen ? 0 : -1}
                      aria-label={`Navigate to ${item.label} section`}
                      style={{
                        transform: isHovered
                          ? "translateX(16px)"
                          : "translateX(0px)",
                      }}
                    >
                      <span
                        className={`text-xs font-grotesk transition-all duration-300 ${
                          isHovered
                            ? "text-[#A3E635] opacity-100 translate-x-0"
                            : "text-[#6D28D9] opacity-40 -translate-x-2"
                        }`}
                      >
                        {item.number}.
                      </span>

                      <span
                        style={{
                          transition: "color 0.3s ease, opacity 0.3s ease",
                        }}
                        className={`text-4xl font-syne font-black tracking-tighter uppercase leading-[0.95] ${
                          isHovered
                            ? "text-[#A3E635] opacity-100"
                            : isSibling
                              ? "text-white opacity-30"
                              : "text-white opacity-90"
                        }`}
                      >
                        {item.label}
                      </span>

                      <FiArrowUpRight
                        className={`text-2xl text-[#A3E635] transition-all duration-300 ${
                          isHovered
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-2 translate-y-2"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="lg:col-span-5 hidden lg:flex justify-center xl:justify-end">
            <div
              ref={previewRef}
              className="w-full max-w-[380px] aspect-[0.9] flex flex-col justify-between p-6 bg-[#0c0d10] border border-white/10 rounded-3xl shadow-2xl relative"
            >
              {displayItem && (
                <>
                  <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
                    <span className="uppercase text-[#A3E635]">
                      {displayItem.preview.category}
                    </span>
                    <span>SECTION {displayItem.number}</span>
                  </div>

                  <div className="my-4 aspect-[1.6] w-full rounded-2xl overflow-hidden relative bg-[#0a0a0c] border border-white/5">
                    {renderVisualFragment(displayItem.preview.type)}
                  </div>

                  <div className="text-left">
                    <h3 className="text-sm font-space font-bold text-white uppercase tracking-wider mb-1">
                      {displayItem.preview.title}
                    </h3>
                    <span className="text-[10px] font-space text-white/30 uppercase tracking-widest block mb-2">
                      {displayItem.preview.subtitle}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed font-sans font-medium">
                      {displayItem.preview.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/5 pt-6 mt-6"
        >
          <div className="flex gap-8">
            <a
              href="https://github.com/PaulaVelezz"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-space tracking-widest text-white/50 hover:text-white transition-colors"
              data-cursor="pointer"
              tabIndex={isOpen ? 0 : -1}
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/paula-velez/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-space tracking-widest text-white/50 hover:text-white transition-colors"
              data-cursor="pointer"
              tabIndex={isOpen ? 0 : -1}
            >
              LINKEDIN
            </a>
            <a
              href="mailto:velezpaula.a@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-space tracking-widest text-white/50 hover:text-white transition-colors"
              data-cursor="pointer"
              tabIndex={isOpen ? 0 : -1}
            >
              EMAIL
            </a>
            <button
              onClick={() => openWhatsApp(contactService)}
              className="text-xs font-space tracking-widest text-white/50 hover:text-white transition-colors"
              data-cursor="pointer"
              tabIndex={isOpen ? 0 : -1}
            >
              WHATSAPP
            </button>
          </div>

          <div className="text-xs font-space text-white/30">
            © 2026 PAULA VELEZ - ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </div>
  );
}
