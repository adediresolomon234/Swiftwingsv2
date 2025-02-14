import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

const PhoneNumberValidation = ({ label, inputValue, onChange }) => {
  const [error, setError] = useState("");

  const handleChange = (value, countryData) => {
    const dialCode = countryData?.dialCode;
    const localNumber = value.slice(dialCode?.length);
    const cleanedLocalNumber = localNumber.startsWith("0")
      ? localNumber.slice(1)
      : localNumber;

    const formattedPhone = `+${dialCode}${cleanedLocalNumber}`;

    onChange(formattedPhone);
  };

  return (
    <div className="">
      {label && <p className="text-swGray800 text-sm mb-2">Enter Phone No</p>}
      <div className="border border-swGray100 cursor-pointer text-swGray800 hover:border-swPrimary500 rounded-lg mt-2 p-2">
        <PhoneInput
          country={"ng"}
          value={inputValue}
          defaultCountry="NG"
          onChange={(value, countryData) => handleChange(value, countryData)}
          enableAreaCodes={true}
          enableLongNumbers={true}
          disableCountryCode={false}
          international={true}
          // enableSearch={true}
          inputProps={{
            required: true,
          }}
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default PhoneNumberValidation;
