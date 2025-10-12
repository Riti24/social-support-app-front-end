import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appTitle: "Social Support Application",
      english: "English",
      arabic: "Arabic",
      step1: "Personal Information",
      step2: "Family and Financial Details",
      step3: "Situations",
      review: "Review and Submit"
    }
  },
  ar: {
    translation: {
      appTitle: "طلب الدعم الاجتماعي",
      english: "الإنجليزية",
      arabic: "العربية",
      step1: "المعلومات الشخصية",
      step2: "تفاصيل الأسرة والوضع المالي",
      step3: "المواقف",
      review: "مراجعة وإرسال"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",           // default
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
