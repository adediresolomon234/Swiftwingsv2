// useForm.ts
import { useState } from "react";
import { validateForm } from "../utils/vaidateform";

function mapValuesToEmptyString(obj) {
  if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
    const result = {};
    for (const key in obj) {
      const val = (obj)[key];
      if (val !== null && typeof val === "object" && !Array.isArray(val)) {
        result[key] = mapValuesToEmptyString(val);
      } else {
        result[key] = "";
      }
    }
    return result;
  }
  return "";
}

// Helper to set a nested value immutably using a path array
function setNestedValue(obj, path, value) {
  if (path.length === 1) {
    return { ...obj, [path[0]]: value };
  }
  const [first, ...rest] = path;
  return {
    ...obj,
    [first]: setNestedValue(obj?.[first] ?? {}, rest, value),
  };
}

export const useForm = initialState => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(
    mapValuesToEmptyString(initialState)
  );

  const validate = (requiredFields) => {
    const { errors, isValid } = validateForm(formData, requiredFields);
    setErrors(errors);
    return isValid;
  };

  const handleChange = (
    e
  ) => {
    const target = e.target;
    const { name, value } = target;

    setFormData((prev) => setNestedValue(prev, name.split("."), value));
    setErrors((prev) => setNestedValue(prev, name.split("."), ""));
  };

  const setError = (path, errorMessage) => {
    const pathArr = path.split(".");
    setErrors((prev) => setNestedValue(prev, pathArr, errorMessage));
  };

  return {
    formData,
    setFormData,
    errors,
    validate,
    handleChange,
    setErrors,
    setError,
  };
};
