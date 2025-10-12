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
      review: "Review and Submit",

      // ✅ Personal form fields
      personal: {
        title: "Personal Information",
        fullName: "Full Name",
        nationalId: "National ID",
        dob: "Date of Birth",
        gender: "Gender",
        selectGender: "Select Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        address: "Address",
        city: "City",
        state: "State",
        country: "Country",
        phone: "Phone",
        email: "Email",
        next: "Next"
      }
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
      review: "مراجعة وإرسال",

      // ✅ Arabic Personal form fields
      personal: {
        title: "المعلومات الشخصية",
        fullName: "الاسم الكامل",
        nationalId: "الهوية الوطنية",
        dob: "تاريخ الميلاد",
        gender: "الجنس",
        selectGender: "اختر الجنس",
        male: "ذكر",
        female: "أنثى",
        other: "آخر",
        address: "العنوان",
        city: "المدينة",
        state: "الولاية",
        country: "الدولة",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        next: "التالي"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
