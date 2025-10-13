import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isStepComplete } from "../store/FormValidation";

export default function ProtectedStepRoute({ step, element }) {
  const form = useSelector((s) => s.form);

  // If previous step not done, redirect
  if (step > 0 && !isStepComplete(form, step - 1)) {
    return <Navigate to="/personal" replace />;
  }

  return element;
}
