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
      helpMeWrite: "Help Me Write",
      next: "Next",
      back: "Back",
      saveExit: "Save & Exit",
      submit: "Submit",
      review: "Review",
      accept: "Accept",
      discard: "Discard",
      edit: "Edit",

      //Step-1 - Personal Information
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
        email: "Email"
      },


      //Step-2 - Family & Financial Details
      family: {
        title: "Family and Financial Details",
        maritalStatus: "Marital Status",
        selectMaritalStatus: "Select Marital Status",
        single: "Single",
        married: "Married",
        widowed: "Widowed",
        divorced: "Divorced",

        dependents: "Number of Dependents",
        employmentStatus: "Employment Status",
        selectEmployment: "Select Employment Status",
        employed: "Employed",
        unemployed: "Unemployed",
        student: "Student",
        retired: "Retired",

        monthlyIncome: "Monthly Income (AED)",
        otherIncome: "Other Sources of Income",
        spouseIncome: "Spouse’s Income (AED)",
        housingType: "Housing Type",
        selectHousing: "Select Housing Type",
        owned: "Owned",
        rented: "Rented",
        governmentHousing: "Government Housing",
      },
      //Step-3 - Situations
      situations: {
        title: "Situations",
        financialSituation: "Current Financial Situation",
        employmentCircumstances: "Employment Circumstances",
        reasonForApplying: "Reason for Applying",
        unemployed: "Unemployed",
        disabled: "Person with Disability",
        student: "Student",
        retired: "Retired",
        other: "Other",
        healthCondition: "Health Condition",
        supportNeeded: "Type of Support Needed",
        errorGenerating: "Could not generate text. Please try again."
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
      helpMeWrite: "ساعدني في الكتابة",
      next: "التالي",
      back: "السابق",
      saveExit: "حفظ وخروج",
      submit: "إرسال",
      review: "مراجعة",
      accept: "قبول",
      discard: "تجاهل",
      edit: "تعديل",

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
      },

      // ✅ Arabic Family & Financial Details
      family: {
        title: "تفاصيل الأسرة والوضع المالي",
        maritalStatus: "الحالة الاجتماعية",
        selectMaritalStatus: "اختر الحالة الاجتماعية",
        single: "أعزب",
        married: "متزوج",
        widowed: "أرمل",
        divorced: "مطلّق",

        dependents: "عدد المعالين",
        employmentStatus: "الوضع الوظيفي",
        selectEmployment: "اختر الوضع الوظيفي",
        employed: "موظف",
        unemployed: "عاطل عن العمل",
        student: "طالب",
        retired: "متقاعد",

        monthlyIncome: "الدخل الشهري (درهم)",
        otherIncome: "مصادر دخل أخرى",
        spouseIncome: "دخل الزوج / الزوجة (درهم)",
        housingType: "نوع السكن",
        selectHousing: "اختر نوع السكن",
        owned: "ملكية خاصة",
        rented: "إيجار",
        governmentHousing: "سكن حكومي",
      },
      situations: {
        title: "المواقف",
        financialSituation: "الوضع المالي الحالي",
        employmentCircumstances: "الظروف الوظيفية",
        unemployed: "عاطل عن العمل",
        disabled: "من ذوي الاحتياجات الخاصة",
        student: "طالب",
        retired: "متقاعد",
        other: "آخر",
        healthCondition: "الحالة الصحية",
        supportNeeded: "نوع الدعم المطلوب",
        errorGenerating: "تعذّر إنشاء النص. يُرجى المحاولة مرة أخرى.",
        reasonForApplying: "سبب التقديم"
      }


    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
