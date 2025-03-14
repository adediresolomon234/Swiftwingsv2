export const maskEmail = (email) => {
  const [localPart, domain] = email.split('@');
  const maskedLocalPart = localPart.length > 3 ? '...' + localPart.slice(-3) : localPart;
  return `${maskedLocalPart}@${domain}`;
};
