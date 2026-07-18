import { useState } from "react";
import { FiGithub, FiLinkedin, FiCopy, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";

const CONTACT_MODES = {
  job: {
    label: "Ofrezco un trabajo",
    extraField: {
      key: "roleType",
      label: "Tipo de rol",
      options: ["Junior", "Semi Senior", "Otro"],
    },
  },
  freelance: {
    label: "Busco un freelance",
    extraField: {
      key: "projectType",
      label: "¿Qué necesitás?",
      options: [
        "Sitio web",
        "Landing page",
        "WordPress custom",
        "E-commerce",
        "Rediseño",
        "Animaciones / Motion",
        "Otro",
      ],
    },
  },
};

function ContactClosing() {
  const [mode, setMode] = useState("freelance");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    contactMethod: "",
    extraField: "",
    message: "",
  });

  const currentMode = CONTACT_MODES[mode];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hola@paulavelez.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setFormData((prev) => ({ ...prev, extraField: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar con google sheets
    console.log({ mode, ...formData });
  };

  return (
    <section className="relative bg-[#0a0a0c] py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Columna izquierda: intro + datos de contacto */}
        <div>
          <span className="text-[#6d28d9] uppercase tracking-[0.35em] text-xs block mb-4">
            // CONTACTO
          </span>
          <TextRevealCurtain
            as="h2"
            className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider text-white mb-8"
            lines={["HABLEMOS"]}
          />

          <div className="space-y-2 mb-10 text-sm text-white/70 leading-relaxed">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              En busca de nuevas experiencias.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              Abierto a aprendizaje continuo.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              Roles Junior / Semi Senior — Desarrollo WordPress y Frontend.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              Remoto, Buenos Aires o Córdoba Capital.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              Respuesta garantizada en menos de 48 horas.
            </p>
          </div>

          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 mb-6 text-lg md:text-xl font-bold text-white hover:text-[#a3e635] transition-colors"
            data-cursor="pointer"
          >
            hola@paulavelez.dev
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 group-hover:border-[#a3e635]/40 transition-colors">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FiCheck className="w-3.5 h-3.5 text-[#a3e635]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FiCopy className="w-3.5 h-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="https://wa.me/5493510000000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-black text-xs font-bold px-5 py-3 transition-colors"
              data-cursor="pointer"
            >
              MANDAR WHATSAPP
            </a>
            <a
              href="https://cal.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 hover:border-white/40 text-white text-xs font-bold px-5 py-3 transition-colors"
              data-cursor="pointer"
            >
              AGENDAR REUNIÓN
            </a>
          </div>

          {/* Redes */}
          <div className="flex gap-4">
            <a
              href="https://github.com/PaulaVelezz"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              data-cursor="pointer"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/paula-velez/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              data-cursor="pointer"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          {/* Toggle de modo */}
          <div className="flex gap-2 mb-8 p-1 rounded-full border border-white/10 w-fit">
            {Object.entries(CONTACT_MODES).map(([key, { label }]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleModeChange(key)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${
                  mode === key
                    ? "bg-[#6d28d9] text-white"
                    : "text-white/50 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/50 mb-2">
                  Nombre *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={handleChange("company")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/50 mb-2">
                  Correo *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-2">
                  WhatsApp / Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-2">
                ¿Cómo te contactamos? *
              </label>
              <select
                required
                value={formData.contactMethod}
                onChange={handleChange("contactMethod")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
              >
                <option value="" disabled className="bg-[#141416]">
                  Elegí una opción
                </option>
                <option value="email" className="bg-[#141416]">
                  Email
                </option>
                <option value="whatsapp" className="bg-[#141416]">
                  WhatsApp
                </option>
                <option value="llamada" className="bg-[#141416]">
                  Llamada
                </option>
                <option value="otros" className="bg-[#141416]">
                  Videollamada
                </option>
              </select>
            </div>

            {/* Campo condicional según el modo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <label className="block text-xs text-white/50 mb-2">
                  {currentMode.extraField.label}
                </label>
                <select
                  value={formData.extraField}
                  onChange={handleChange("extraField")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                >
                  <option value="" disabled className="bg-[#141416]">
                    Elegí una opción
                  </option>
                  {currentMode.extraField.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#141416]">
                      {opt}
                    </option>
                  ))}
                </select>
              </motion.div>
            </AnimatePresence>

            <div>
              <label className="block text-xs text-white/50 mb-2">
                Mensaje
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={handleChange("message")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-black text-sm font-bold py-3.5 transition-colors"
              data-cursor="pointer"
            >
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactClosing;
