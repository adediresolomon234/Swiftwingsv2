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
    <div className="p-4 border border-swPrimary200 rounded-lg bg-white">
      <h2 className="text-lg md:text-2xl font-medium mb-5">Password</h2>
      <div className="self-stretch flex flex-col sm:flex-row items-center sm:items-start justify-start gap-5 text-gray-700">
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
              className="flex items-center justify-center h-[36px] w-[100px] gap-2 rounded-full text-base relative cursor-pointer border text-swPrimary500 border-swPrimary500 hover:bg-swPrimary100"
            >
              Update
              {/* <SWEditIcon2 /> */}
            </button>
          </div>
        )}
        {compState === "edit" && (
          <div className="self-end flex-1 flex justify-end gap-2 items-end w-full h-full sm:w-auto">
            <button
              onClick={() => setCompState("view")}
              className="flex items-center justify-center h-[36px] w-[84px] gap-2 rounded-full text-base cursor-pointer border border-swPrimary500 hover:bg-swPrimary100 text-swPrimary500"
            >
              Cancel
            </button>
            <button
              // onClick={() => setCompState("edit")}
              className="bg-swPrimary500 text-white flex items-center justify-center gap-2 h-[36px] w-[84px] rounded-full text-base cursor-pointer border"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordSection;
