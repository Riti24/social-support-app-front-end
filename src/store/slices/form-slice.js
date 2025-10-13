import { createSlice } from "@reduxjs/toolkit";

const initialForm = {
  step: 0,
  personal: {
    name: "",
    nationalId: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  },
  family: {
    maritalStatus: "",
    dependents: 0,
    employmentStatus: "",
    monthlyIncome: "",
    housingStatus: "",
  },
  situations: {
    financialSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
  },
};

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("formState");
    return data ? JSON.parse(data) : initialForm;
  } catch (err) {
    console.error("Failed to load form from storage", err);
    return initialForm;
  }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem("formState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save form to storage", err);
  }
};

const formSlice = createSlice({
  name: "form",
  initialState: loadFromStorage(),
  reducers: {
    setPersonal(state, { payload }) {
      state.personal = { ...state.personal, ...payload };
      saveToStorage(state);
    },
    setFamily(state, { payload }) {
      state.family = { ...state.family, ...payload };
      saveToStorage(state);
    },
    setSituations(state, { payload }) {
      state.situations = { ...state.situations, ...payload };
      saveToStorage(state);
    },
    setStep(state, { payload }) {
      state.step = payload;
      saveToStorage(state);
    },
    reset(state) {
      Object.assign(state, initialForm);
      localStorage.removeItem("formState");
    },
  },
});

export const { setPersonal, setFamily, setSituations, setStep, reset } =
  formSlice.actions;
export default formSlice.reducer;
