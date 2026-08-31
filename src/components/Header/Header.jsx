import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BiMenuAltRight } from "react-icons/bi";
import { useTranslation } from "react-i18next";

export default function Header({
  currentPage,
  setPage,
  menuOpen,
  setMenuOpen,
}) {
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (menuOpen) {
      // Slide down and fade in dropdown
      gsap.fromTo(
        dropdown,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    } else {
      // Slide up and fade out dropdown
      gsap.to(dropdown, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "HOME", page: "/" },
    { label: "PROJECTS", page: "/projects" },
    { label: "SERVICES", page: "/about#services" },
    { label: "CONTACT", page: "/contact" },
  ];

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        border-b
        transition-all
        duration-500
        rounded-b-3xl
        ${
          scrolled
            ? "bg-[#0A0A0C]/75 backdrop-blur-xl border-white/10 shadow-lg"
            : "bg-[#0A0A0C] border-white/5"
        }
      `}
    >
      <div className="w-full px-6 md:px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        <button
          type="button"
          onClick={() => setPage("/")}
          className="
            cursor-pointer
            select-none
            font-korium
            font-bold
            text-white
            hover:text-[#A3E635]
            transition-all
            duration-300
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#A3E635]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0A0A0C]
          "
          data-cursor="magnetic"
          aria-label="Home page logo"
        >
          <span
            className={`
            inline-block
            transition-all
            duration-500
            ${scrolled ? "text-3xl md:text-4xl" : "text-3xl md:text-4xl"}
          `}
          >
            {/* Mobile */}
            <span className="md:hidden">PV</span>

            {/* Desktop dinámico según scroll */}
            <span className="hidden md:inline">
              {scrolled ? "PV" : "PAULA VELEZ"}
            </span>

            <span className="text-[#A3E635]">.</span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          {/* LANGUAGE SWITCHER */}
          <div
            className="
            h-11
            px-1.5
            rounded-full
            bg-white/10
            border
            border-white/10
            backdrop-blur-md
            flex
            items-center
            gap-1
            shadow-lg
          "
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => i18n.changeLanguage("es")}
              className={`
                h-8
                px-3
                rounded-full
                text-[10px]
                font-space
                font-bold
                tracking-widest
                transition-all
                duration-300
                ${
                  i18n.language === "es"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white"
                }
              `}
              aria-pressed={i18n.language === "es"}
            >
              ES
            </button>

            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`
                h-8
                px-3
                rounded-full
                text-[10px]
                font-space
                font-bold
                tracking-widest
                transition-all
                duration-300
                ${
                  i18n.language === "en"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white"
                }
              `}
              aria-pressed={i18n.language === "en"}
            >
              EN
            </button>
          </div>

          {/* MENU */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              h-11
              px-6
              rounded-full
              bg-white
              hover:bg-neutral-100
              flex
              items-center
              gap-3
              text-black
              hover:text-[#6d28d9]
              text-[11px]
              font-space
              font-bold
              tracking-widest
              cursor-pointer
              shadow-lg
              transition-colors
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#A3E635]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0A0A0C]
            "
            data-cursor="magnetic"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {menuOpen ? t("nav.close") : t("nav.menu")}

            <div className="flex flex-col gap-[3px] items-center justify-center">
              <BiMenuAltRight className="text-2xl" aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
