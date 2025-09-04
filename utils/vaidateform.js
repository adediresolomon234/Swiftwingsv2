/*eslint-disable*/
/**
 * Gets a nested value from an object using a dot-separated path.
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

/**
 * Sets a nested error in an object using a dot-separated path.
 */
function setNestedError(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  if (!lastKey) return; // Prevents error if path is empty
  let curr = obj;
  for (const key of keys) {
    if (!curr[key]) curr[key] = {};
    curr = curr[key];
  }
  curr[lastKey] = value;
}

/**
 * Validates form data against required fields (supports nested fields).
 * @param formData - The form data object to validate.
 * @param requiredFields - List of fields that are required (dot notation for nested).
 * @returns An object containing errors and a boolean `isValid`.
 */
export const validateForm = (
  formData,
  requiredFields
) => {
  const errors = {};
  let isValid = true;

  requiredFields.forEach((fieldPath) => {
    const value = getNestedValue(formData, fieldPath);
    if (!value) {
      setNestedError(errors, fieldPath, "This field is required");
      isValid = false;
    }
  });

  return { errors, isValid };
};
