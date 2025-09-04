export const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.length > 3 ? "..." + localPart.slice(-3) : localPart;
  return `${maskedLocalPart}@${domain}`;
};

export const handleInputChangeWithComma = (e, formData) => {
  const value = e.target.value.replace(/,/g, "");
  formData((prevData) => ({
    ...prevData,
    [e.target.id]: value ? parseFloat(value) : 0,
  }));
};

export const preventNonNumeric = (e, allowComma) => {
  const allowedKeys =
    allowComma === "comma"
      ? ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", ","]
      : allowComma === "dot"
      ? ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "."]
      : ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  if (allowedKeys.includes(e.key)) {
    return;
  }

  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};
