import React, { useEffect, useState } from "react";
import { SwKeyIcon, SwOpenEyeIcon } from "../svgs";
import { TbEyeClosed } from "react-icons/tb";
import InputField from "../shared/InputField";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";

const ChangePasswordComp = ({
  pageState,
  setPageState,
  formData,
  setFormData,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setLoading(true);
    const message = "Password changed successfully";
    const payload = formData;

    dispatch(resetPassword(payload))
      .unwrap()
      .then((res) => {
        if (res?.message === message) {
          toast.success(res?.message);
          router.push("/sign-in");
        } else {
          toast.error(res?.message);
          setPageState(0);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
        setPageState(0);
      })
      .finally(() => setLoading(false));
  };

  const viewPassword = showPassword ? (
    <SwOpenEyeIcon className="text-xl" onClick={togglePasswordVisibility} />
  ) : (
    <TbEyeClosed className="text-xl" onClick={togglePasswordVisibility} />
  );

  useEffect(() => {
    setFormData({ ...formData, password });
  }, [password]);

  // useEffect(() => {
  //   if (pageState === 0) {
  //     setPassword(formData.password);
  //   }
  // }, [pageState]);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-2xl font-semibold text-swGray800">
        Change Password
      </p>
      <div className="w-full flex flex-col gap-3 mt-5">
        <div className="w-full mt-5">
          <InputField
            label={"Password"}
            placeholder={"Enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            name={"password"}
            value={password}
            endIcon={viewPassword}
            inputType={showPassword ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
        </div>
        <div className="w-full">
          <InputField
            label={"Confirm Password"}
            placeholder={"Enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            name={"confirmPassword"}
            value={confirmPassword}
            endIcon={viewPassword}
            inputType={showPassword ? "text" : "password"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError("");
            }}
          />
          {confirmPasswordError && (
            <p className="text-sm text-red-500">{confirmPasswordError}</p>
          )}
        </div>
      </div>
      <div className="mt-10 mb-7 flex flex-col gap-3 w-full">
        <Button
          label={loading ? "Updating..." : "Change Password"}
          bgColor="bg-swPrimary500 text-white w-full"
          onClick={handleChangePassword}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ChangePasswordComp;
