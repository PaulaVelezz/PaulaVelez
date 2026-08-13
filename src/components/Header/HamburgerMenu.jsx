import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import abstractBg from "../../assets/abstract-6.webp";
import IMGP2 from "../../assets/Mp2.webp";
import IMGP5 from "../../assets/Mp5.webp";
import { SERVICES, openWhatsApp } from "../../services/whatsAppService.js";
import { useTranslation } from "react-i18next";

export default function HamburgerMenu({ isOpen, setPage, onClose }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const linksRef = useRef([]);
  const previewRef = useRef(null);
  const metaRef = useRef(null);
  const contactService = SERVICES.find((s) => s.id === "portfolio-contact");

  const { t } = useTranslation();

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [displayItem, setDisplayItem] = useState(null);

  const menuItems = [
    {
      key: "home",
      page: "/",
      number: "01",
      preview: {
        type: "home",
      },
    },
    {
      key: "about",
      page: "/about",
      number: "02",
      preview: {
        type: "about",
      },
    },
    {
      key: "projects",
      page: "/projects",
      number: "03",
      preview: {
        type: "projects",
      },
    },
    {
      key: "services",
      page: "/about#services",
      number: "04",
      preview: {
        type: "services",
      },
    },
    {
      key: "contact",
      page: "/contact",
      number: "05",
      preview: {
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
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="my-auto z-10">
              <h4 className="text-xl sm:text-2xl font-syne font-black tracking-tight text-white leading-[1.1]">
                WordPress Developer & <br />
                <span className="text-[#A3E635]">Frontend [React.js].</span>
              </h4>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
              <span>PROJECTS INDEX (20)</span>
              <span className="text-[#A3E635]">SELECTED CASE STUDIES</span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-auto z-10">
              <div className="group/mini relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={IMGP2}
                  alt="REPARAME"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-[#6D28D9]/20 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="group/mini relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={IMGP5}
                  alt="SAAS LANDING PAGE"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-[#A3E635]/20 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-space text-white/40 tracking-wider">
              <span>REPARAME</span>
              <span>SAAS LANDING PAGE</span>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-space tracking-[0.25em] uppercase text-[#A3E635]">
                // MY STACK
              </span>

              <span className="text-[9px] font-space text-white/30">04</span>
            </div>

            {/* Cards */}
            <div className="relative flex justify-center items-end h-28 mt-2">
              {[
                { title: "WP", color: "#A3E635", rotate: -16, x: -58 },
                { title: "FE", color: "#fff", rotate: -6, x: -18 },
                { title: "UI", color: "#6D28D9", rotate: 6, x: 18 },
                { title: "AI", color: "#A3E635", rotate: 16, x: 58 },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    transform: `translateX(${card.x}px) rotate(${card.rotate}deg)`,
                    zIndex: i + 1,
                  }}
                  className="
                    absolute
                    w-16
                    h-24
                    rounded-xl
                    bg-[#141416]
                    border
                    border-white/10
                    shadow-xl
                    flex
                    flex-col
                    justify-between
                    p-2
                  "
                >
                  <span className="text-[7px] font-space text-white/25">
                    0{i + 1}
                  </span>

                  <span
                    className="text-lg font-black font-korium text-center"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </span>

                  <span className="h-[2px] rounded-full bg-white/10" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-[8px] font-space uppercase tracking-[0.3em] text-white/45">
                WORDPRESS · FRONTEND · UI · AI
              </p>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
              <span className="text-[9px] font-space tracking-[0.25em] uppercase text-[#A3E635]">
                // PROFESSIONAL PROFILE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-auto z-10 border-y border-white/5 py-6">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="block text-2xl font-syne font-black text-white leading-none">
                  2+
                </span>
                <span className="mt-2 text-[8px] font-space text-white/40 uppercase tracking-[0.2em] leading-tight">
                  Years
                  <br />
                  Experience
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <span className="block text-2xl font-syne font-black text-[#A3E635] leading-none">
                  35+
                </span>
                <span className="mt-2 text-[8px] font-space text-white/40 uppercase tracking-[0.2em] leading-tight">
                  Projects
                  <br />
                  Delivered
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <span className="block text-2xl font-syne font-black text-white leading-none">
                  10+
                </span>
                <span className="mt-2 text-[8px] font-space text-white/40 uppercase tracking-[0.2em] leading-tight">
                  Industries
                  <br />
                  Sectors
                </span>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden text-left">
            <div className="flex justify-between items-center text-[9px] font-space tracking-widest text-neutral-400">
              <span className="text-[#A3E635] animate-pulse">
                ● OPEN TO WORK
              </span>
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
                  <div key={item.key} className="overflow-hidden">
                    <button
                      ref={(el) => (linksRef.current[idx] = el)}
                      onClick={() => handleLinkClick(item.page)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="group flex items-baseline gap-4 cursor-pointer py-1 bg-transparent border-none text-left focus:outline-none w-full transition-transform duration-300"
                      tabIndex={isOpen ? 0 : -1}
                      aria-label={t("menu.aria.navigateTo", {
                        section: t(`menu.items.${item.key}.label`),
                      })}
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
                        {t(`menu.items.${item.key}.label`)}
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
                      {t(`menu.items.${displayItem.key}.category`)}
                    </span>

                    <span>
                      {t("menu.preview.section")} {displayItem.number}
                    </span>
                  </div>

                  <div className="my-4 aspect-[1.6] w-full rounded-2xl overflow-hidden relative bg-[#0a0a0c] border border-white/5">
                    {renderVisualFragment(displayItem.preview.type)}
                  </div>

                  <div className="text-left">
                    <h3 className="text-sm font-space font-bold text-white uppercase tracking-wider mb-1">
                      {t(`menu.items.${displayItem.key}.title`)}
                    </h3>
                    <span className="text-[10px] font-space text-white/30 uppercase tracking-widest block mb-2">
                      {t(`menu.items.${displayItem.key}.subtitle`)}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed font-sans font-medium">
                      {t(`menu.items.${displayItem.key}.description`)}
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
