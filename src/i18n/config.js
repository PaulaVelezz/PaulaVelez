import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("language");

const browserLanguage = navigator.language?.startsWith("en") ? "en" : "es";

const initialLanguage = savedLanguage || browserLanguage;

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: es,
    },
    en: {
      translation: en,
    },
  },

  lng: initialLanguage,
  fallbackLng: "es",

  interpolation: {
    escapeValue: false,
  },

  returnNull: false,
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem("language", language);

  document.documentElement.lang = language;
});

export default i18n;
