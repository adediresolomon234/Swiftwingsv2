import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";

const PhoneNumberValidation = ({label, inputValue, onChange }) => {
  const [error, setError] = useState("");
  const handleChange = (value) => {
    onChange(value || "");
    if (value && isValidPhoneNumber(value)) {
      setError("");
    } else {
      setError("Invalid phone number");
    }
  };

  return (
    <div>
      {label && (
        <p className="text-swGray800 text-sm mb-2">Enter Phone No</p>
      )}
      <div className="border border-swGray100 cursor-pointer text-swGray800 hover:border-swPrimary500 rounded-lg mt-2 py-2.5 px-3">
          <PhoneInput
            country={"ng"}
            value={inputValue}
            defaultCountry="NG"
            onChange={handleChange}
            international={true}
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
