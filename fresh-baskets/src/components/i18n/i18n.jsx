import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
const resources = {
  en: {
    translation: {
      "aboutUs": "About Us",
      "login": "Login",
      "signUp": "Sign Up",
      "freshBaskets": "Fresh Baskets",
    },
  },
  tl: {
    translation: {
      "aboutUs": "Tungkol sa Amin",
      "login": "Mag-login",
      "signUp": "Mag-sign Up",
      "freshBaskets": "Sariwang Basket",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already handles escaping
  },
});

export default i18n;