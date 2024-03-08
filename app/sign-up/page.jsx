"use client";
import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import Button from "../components/Button";
import InputField from "../components/shared/InputField";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/slices/authSlice";
import { TbEyeClosed } from "react-icons/tb";
import {
    SwGoogleColoredIcon,
    SwKeyIcon,
    SwMailIcon,
    SwOpenEyeIcon,
    SwPlusIcon,
} from "../components/svgs";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [renterPassword, setRenterPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setPasswordVisibility(!passwordVisibility);
    };

    const dispatch = useDispatch()

    const registerHandle = () => {
        console.table(email, password, renterPassword)
        if (password !== renterPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        if (!isValidPassword(password)) {
            setPasswordError("Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit");
            return;
        }
        dispatch(signUpUser({ email, password, renterPassword }))
    };
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="max-w-sm w-full p-2 mt-20">
                <p className="text-center text-2xl font-medium">Create a new account</p>
                <p className="text-center mt-2 mb-8 text-[0.95rem]">
                    Join Swiftwings, book a jet, Enjoy premium membership offers and privileges
                </p>

                <div className="w-full">
                    <InputField
                        label={"Email"}
                        placeholder={"Enter email address"}
                        startIcon={<SwMailIcon className="text-xl" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Password"}
                        placeholder={"Enter password"}
                        startIcon={<SwKeyIcon className="text-xl" />}
                         endIcon={showPassword ? <SwOpenEyeIcon className="text-xl" onClick={togglePasswordVisibility} /> : <TbEyeClosed className="text-xl" onClick={togglePasswordVisibility} />} // Toggle eye icon based on password visibility
                        type={showPassword ? "text" : "password"}
                        value={passwordVisibility ? password : "********"}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                        }}
                    />
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Re-enter password"}
                        placeholder={"Re-enter password"}
                        startIcon={<SwKeyIcon className="text-xl" />}
                        endIcon={showPassword ? <SwOpenEyeIcon className="text-xl" onClick={togglePasswordVisibility} /> : <TbEyeClosed className="text-xl" onClick={togglePasswordVisibility} />} // Toggle eye icon based on password visibility
                        type={showPassword ? "text" : "password"}
                        value={passwordVisibility ? password : "********"}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                        }}
                    />
                </div>
                {passwordError && (
                    <p className="text-red-500 text-sm mt-2">
                        {passwordError}
                    </p>
                )}
                <div className="my-7 flex flex-col gap-3">
                    <Button
                        label={"Sign Up"}
                        bgColor={"bg-swPrimary500 text-white w-full"}
                        onClick={registerHandle}
                    />
                </div>
                <div
                    class="my-4 mt-2 flex items-center before:mt-0.1 before:flex-1 before:border-t before:border-neutral-200 after:mt-0.1 after:flex-1 after:border-t after:border-neutral-200">
                    <p
                        class="mx-4 mb-0 text-center font-medium text-swGray700">
                        Or
                    </p>
                </div>
                <div className="my-7 flex flex-col gap-3">
                    <Button
                        startIcon={<SwGoogleColoredIcon className="text-xl" />}
                        label={"Google sign up"}
                        textColor={"font-semibold text-swGray800 border border-swGray100"}
                    />
                </div>
                <p className="text-swGray800 text-center">
                    Already have an account ?
                </p>
                <div className="w-full mt-4 font-medium">
                    <Button
                        label={"Login"}
                        textColor={
                            "font-semibold text-swGray800 border border-swGray100 w-full"
                        }
                    />
                </div>
            </div>
        </main>
    );
};

export default SignUp;
