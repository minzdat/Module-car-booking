import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./assets/locales/en/translationEN.json";
import translationVN from "./assets/locales/vn/translationVN.json";

const resources = {
  en: {
    translation: translationEN
  },
  vn: {
    translation: translationVN
  }
};

i18n
  .use(Backend)

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    lng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
