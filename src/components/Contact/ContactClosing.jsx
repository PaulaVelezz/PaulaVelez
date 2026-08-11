import { useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiCalendar,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";
import { SERVICES, openWhatsApp } from "../../services/whatsAppService.js";
import SocialIconTilt from "./SocialIconTilt.jsx";
import ContactFooterVisual from "../Footer/ContactFooterVisual.jsx";
import { useTranslation } from "react-i18next";

const CONTACT_MODES = {
  job: {
    label: "contact.modes.job.label",
    extraField: {
      key: "roleType",
      label: "contact.modes.job.extraField.label",
      options: [
        "contact.modes.job.extraField.options.junior",
        "contact.modes.job.extraField.options.juniorAdvanced",
        "contact.modes.job.extraField.options.semiSenior",
        "contact.modes.job.extraField.options.other",
      ],
    },
  },
  freelance: {
    label: "contact.modes.freelance.label",
    extraField: {
      key: "projectType",
      label: "contact.modes.freelance.extraField.label",
      options: [
        "contact.modes.freelance.extraField.options.landingPage",
        "contact.modes.freelance.extraField.options.corporateWebsite",
        "contact.modes.freelance.extraField.options.wordpress",
        "contact.modes.freelance.extraField.options.woocommerce",
        "contact.modes.freelance.extraField.options.tiendaNube",
        "contact.modes.freelance.extraField.options.eLearning",
        "contact.modes.freelance.extraField.options.redesign",
        "contact.modes.freelance.extraField.options.other",
      ],
    },
  },
};

function ContactClosing({ showFooterVisual = false }) {
  const [mode, setMode] = useState("freelance");
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    contactMethod: "",
    extraField: "",
    message: "",
  });

  const currentMode = CONTACT_MODES[mode];
  const contactService = SERVICES.find((s) => s.id === "portfolio-contact");

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
    <section
      id="contact_closing"
      className="relative bg-[#0a0a0c] py-16 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-[#6d28d9] uppercase tracking-[0.35em] text-xs block mb-4">
            // {t("contact.label")}
          </span>
          <TextRevealCurtain
            as="h2"
            className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider text-white mb-8"
            lines={[t("contact.title")]}
          />

          <div className="space-y-2 mb-5 text-sm text-white/70 leading-relaxed">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              {t("contact.availability.freelance")}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              {t("contact.availability.roles")}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              {t("contact.availability.response")}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              {t("contact.availability.location")}
            </p>
          </div>

          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 mb-6 text-lg md:text-xl font-bold text-white hover:text-[#a3e635] transition-colors"
            data-cursor="pointer"
          >
            velezpaula.a@gmail.com
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

          {/* Redes */}
          <div className="grid grid-cols-2 gap-4 max-w-[340px]">
            <SocialIconTilt
              href="https://github.com/PaulaVelezz"
              label={t("contact.social.github")}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              icon={FiGithub}
              data-cursor="pointer"
            />
            <SocialIconTilt
              href="https://www.linkedin.com/in/paula-velez/"
              label={t("contact.social.linkedin")}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              icon={FiLinkedin}
            />
            <SocialIconTilt
              href="https://calendly.com/velezpaula-a/30-minutes-meeting"
              label={t("contact.social.calendar")}
              target="_blank"
              rel="noreferrer"
              icon={FiCalendar}
            />
            <SocialIconTilt
              onClick={() => openWhatsApp(contactService)}
              label={t("contact.social.whatsapp")}
              data-cursor="pointer"
              icon={FaWhatsapp}
            />
          </div>
        </div>

        {/* Toggle de modo */}
        <div className="bg-[#111113] border border-white/8 rounded-3xl p-6 md:p-8">
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
                {t(label)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/50 mb-2">
                  {t("contact.form.name")} *
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
                  {t("contact.form.company")}
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
                  {t("contact.form.email")} *
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
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                />
              </div>
            </div>
            {/* MÉTODO DE CONTACTO */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {t("contact.form.contactMethod")} *
              </label>
              <select
                required
                value={formData.contactMethod}
                onChange={handleChange("contactMethod")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
              >
                <option value="" disabled className="bg-[#141416]">
                  {t("contact.form.selectOption")}
                </option>
                <option value="email" className="bg-[#141416]">
                  {t("contact.form.methods.email")}
                </option>
                <option value="whatsapp" className="bg-[#141416]">
                  {t("contact.form.methods.whatsapp")}
                </option>
                <option value="llamada" className="bg-[#141416]">
                  {t("contact.form.methods.call")}
                </option>
                <option value="otros" className="bg-[#141416]">
                  {t("contact.form.methods.videoCall")}
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
                  {t(currentMode.extraField.label)}
                </label>
                <select
                  value={formData.extraField}
                  onChange={handleChange("extraField")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6d28d9] transition-colors"
                >
                  <option value="" disabled className="bg-[#141416]">
                    {t("contact.form.selectOption")}
                  </option>
                  {currentMode.extraField.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#141416]">
                      {t(opt)}
                    </option>
                  ))}
                </select>
              </motion.div>
            </AnimatePresence>
            {/* MENSAJE */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {t("contact.form.message")}
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
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </div>
      {showFooterVisual && (
        <>
          <div className="relative w-full mt-30">
            <p className="text-center mb-2 text-[11px] uppercase tracking-[0.25em] text-stone-200 font-space">
              {t("contact.footer.copyright")}
            </p>
            <ContactFooterVisual />
          </div>

          <div className="relative z-20 mt-2">
            <div
              className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-[2px]
                  bg-gradient-to-r
                  from-[#6d28d9]
                  via-[#8b5cf6]
                  to-[#A3E635]
                  "
            />
            <div className="max-w-6xl mx-auto h-10 flex items-center justify-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone-200 font-space">
                {t("contact.footer.thanks")}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ContactClosing;
