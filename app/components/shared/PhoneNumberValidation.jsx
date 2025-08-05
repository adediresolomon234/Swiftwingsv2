import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const PhoneNumberValidation = ({
  label = "Phone",
  value,
  onChange,
  error,
  country = "ng",
  placeholder = "Enter phone number",
  required = false,
  disabled = false,
  autoFormat = false,
  containerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  ...props
}) => {
  const isRequired = required || label?.includes("*");

  const handleChange = (value, countryData) => {
    const dialCode = countryData?.dialCode;
    const localNumber = value.slice(dialCode?.length);
    const cleanedLocalNumber = localNumber.startsWith("0")
      ? localNumber.slice(1)
      : localNumber;

    const formattedPhone = `${dialCode}${cleanedLocalNumber}`;

    onChange?.(formattedPhone);
  };

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <div className="text-sm text-swGray800 mb-3">
          {label}
          {isRequired && !label.includes("*") && " *"}
        </div>
      )}
      <div className="rounded-lg font-normal border border-swGray300 hover:border-swPrimary500 focus-within:border-swPrimary500 overflow-visible relative">
        <PhoneInput
          country={country}
          autoFormat={autoFormat}
          value={value}
          disableCountryCode={true}
          onChange={(value) => onChange(value)}
          disabled={disabled}
          placeholder={placeholder}
          containerClass="h-11 !static !rounded-l-4xl font-normal"
          buttonClass={`!border-none !absolute !rounded-l-lg !hover:border-none !hover:outline-none !focus:border-none !focus:outline-none !left-0 !top-0 !h-full !w-12 !z-10 ${buttonClassName}`}
          dropdownClass="!absolute !top-full !left-0 !z-50 !mt-1"
          inputClass={`
    ${poppins.className}
    min-h-11 min-w-full text-gray-500 !text-base !font-normal !border-none !rounded-l-4xl !rounded-r-lg !pl-12 ${
      disabled ? "!bg-gray-100 !text-gray-400" : ""
    } ${inputClassName}`}
          {...props}
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default PhoneNumberValidation;
