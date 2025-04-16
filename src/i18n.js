import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import yo from './locales/yo.json';
import ig from './locales/ig.json';

// Initialize i18n
i18n
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
        en: { translation: en },
        fr: { translation: fr },
        es: { translation: es },
        zh: { translation: zh },
        ar: { translation: ar },
        hi: { translation: hi },
        yo: { translation: yo },
        ig: { translation: ig }
      },
    fallbackLng: 'en',          // Default language
    interpolation: {
      escapeValue: false,       // React already escapes values
    },
  });

export default i18n;
