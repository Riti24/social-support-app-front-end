export const isStepComplete = (form, step) => {
  switch (step) {
    case 0: // Personal info complete
      return !!form.personal.fullName && !!form.personal.email && !!form.personal.nationalId;
    case 1: // Family info complete
      return !!form.family.maritalStatus && !!form.family.employmentStatus;
    case 2: // Situations complete
      return !!form.situations.financialSituation && !!form.situations.reasonForApplying;
    default:
      return true;
  }
};