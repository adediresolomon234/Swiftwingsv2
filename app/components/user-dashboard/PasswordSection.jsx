import { useState } from "react";
import InputField from "../shared/InputField";
import { SwKeyIcon, SwOpenEyeIcon } from "../svgs";
import { TbEyeClosed } from "react-icons/tb";
import { SWEditIcon2 } from "../svgs";
import { useForm } from "../../../hooks/useForm";
import { FaCheck } from "react-icons/fa6";

const PasswordSection = ({
  showPassword,
  setShowPassword,
  onChangePassword,
}) => {
  const [compState, setCompState] = useState("view");
  const { formData, handleChange } = useForm({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  return (
    <div className="self-stretch flex flex-col gap-6 text-gray-700 p-4 border border-swGray300 rounded-lg mx-5">
      <div className="w-full">
        <div className="text-swGray700 max-w-[350px] w-full">
          <InputField
            label="Current Password"
            placeholder="********"
            startIcon={<SwKeyIcon className="text-xl text-gray-500" />}
            value={formData.current_password}
            onChange={handleChange}
            name="current_password"
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <SwOpenEyeIcon className="text-xl text-gray-600" />
                ) : (
                  <TbEyeClosed className="text-xl text-gray-600" />
                )}
              </button>
            }
            inputType={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />
        </div>
        {compState === "edit" && (
          <>
            <div className="text-swGray700 max-w-[350px] w-full mt-5">
              <InputField
                label="New Password"
                placeholder="********"
                startIcon={<SwKeyIcon className="text-xl text-gray-500" />}
                value={formData.new_password}
                onChange={handleChange}
                name="new_password"
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <SwOpenEyeIcon className="text-xl text-gray-600" />
                    ) : (
                      <TbEyeClosed className="text-xl text-gray-600" />
                    )}
                  </button>
                }
                inputType={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="text-swGray700 max-w-[350px] w-full mt-5">
              <InputField
                label="Confirm New Password"
                placeholder="********"
                startIcon={<SwKeyIcon className="text-xl text-gray-500" />}
                value={formData.confirm_password}
                onChange={handleChange}
                name="confirm_password"
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <SwOpenEyeIcon className="text-xl text-gray-600" />
                    ) : (
                      <TbEyeClosed className="text-xl text-gray-600" />
                    )}
                  </button>
                }
                inputType={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
              />
            </div>
          </>
        )}
      </div>
      {compState === "view" && (
        <div className="self-end flex-1 flex justify-end items-end w-full h-full sm:w-auto">
          <button
            onClick={() => setCompState("edit")}
            className="flex items-center justify-center h-[36px] w-[100px] gap-2 rounded-full text-base relative font-medium cursor-pointer border"
          >
            Change
            <SWEditIcon2 />
          </button>
        </div>
      )}
      {compState === "edit" && (
        <div className="self-end flex-1 flex justify-end gap-2 items-end w-full h-full sm:w-auto">
          <button
            onClick={() => setCompState("view")}
            className="flex items-center justify-center h-[36px] w-[84px] gap-2 rounded-full text-base relative font-medium cursor-pointer border"
          >
            Cancel
          </button>
          <button
            // onClick={() => setCompState("edit")}
            className="bg-swPrimary500 text-white flex items-center justify-center gap-2 h-[36px] w-[135px] rounded-full text-base relative font-medium cursor-pointer border"
          >
            Save changes <FaCheck size={10} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordSection;
