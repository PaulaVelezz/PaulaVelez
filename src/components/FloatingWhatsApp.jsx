import { RiMessage3Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { SERVICES, openWhatsApp } from "../services/whatsAppService.js";

const FloatingWhatsApp = () => {
  const contactService = SERVICES.find((s) => s.id === "portfolio-contact");

  return (
    <motion.a
      onClick={() => openWhatsApp(contactService)}
      aria-label="Contacto por WhatsApp"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        fixed
        bottom-8
        right-8
        z-50

        flex
        h-14
        w-14
        items-center
        justify-center

        overflow-hidden
        rounded-2xl

        border
         border-[#22C55E]
        bg-[#22C55E]
        text-white
       
        backdrop-blur-xl

        shadow-elevated

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#6d28d9]
      "
    >
      {/* Background Animation */}
      <span
        className="
          absolute
          inset-0
          -z-10
          translate-y-full

          bg-gradient-to-t
          from-[#7c3aed]
          to-[#6d28d9]

          transition-transform
          duration-300
          ease-out

          group-hover:translate-y-0
        "
      />

      <RiMessage3Line
        className="
          h-6
          w-6
           text-white

          transition-all
          duration-300

          group-hover:-rotate-6
          group-hover:scale-110
          group-hover:text-white
        "
      />
    </motion.a>
  );
};

export default FloatingWhatsApp;
