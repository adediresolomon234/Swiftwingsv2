"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SWheader from "../../../public/images/SWheader.png";

// Fonts
import { Libre_Baskerville } from "next/font/google";

// Components
import Button from "../../components/Button";
import InputField from "../../components/shared/InputField";
import Loading from "../../components/Loading";

// Icons and Assets
import { TbEyeClosed } from "react-icons/tb";
import {
  SWLogo,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
  SwPlusIcon,
} from "../../components/svgs";
import bgImg from "../../../public/images/nologgedInImg.png";

// Utils
import { isValidEmail } from "../../components/helpers/emailValidation";
import { API_URL } from "../../../constant";

// Font configurations
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Constants
const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const INITIAL_ERROR_STATE = {
  email: "",
  password: "",
};

const SignIn = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form state
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Business logic state
  const [bookingInComplete, setBookingInComplete] = useState(false);

  // Memoized values for performance
  const isFormValid =
    formData.email && formData.password && !errors.email && !errors.password;
  const isSubmitDisabled = loading || !isFormValid;

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setErrors(INITIAL_ERROR_STATE);
    setShowPassword(false);
  }, []);

  // Handle input changes with validation
  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  // Validate form fields
  const validateField = useCallback((field, value) => {
    switch (field) {
      case "email":
        if (!value) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email address";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";

      default:
        return "";
    }
  }, []);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  }, [formData, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        setLoading(true);

        const response = await axios.post(`${API_URL}/user/login`, {
          email: formData.email.trim(),
          password: formData.password,
        });

        if (response?.data?.data) {
          const userData = response.data.data;
          const userWithAuth = { ...userData, isLoggedIn: true };

          // Store user data securely
          sessionStorage.setItem("user", JSON.stringify(userWithAuth));
          const expiry = Date.now() + 60 * 60 * 1000; // 1 hour from signin
          sessionStorage.setItem("loginExpiry", expiry);

          // Show success message
          toast.success(response.data.message || "Login successful!");

          // Reset form
          resetForm();

          // Navigate based on booking status
          startTransition(() => {
            if (bookingInComplete) {
              router.push("/booking");
              sessionStorage.removeItem("bookingInComplete");
            } else {
              router.push("/");
            }
          });
        } else {
          toast.error("Invalid response from server");
        }
      } catch (error) {
        console.error("Login error:", error);

        // Handle different types of errors
        if (error?.response?.status === 401) {
          const errorMessage =
            error.response?.data?.error || error.response?.data?.message || "";

          // Check if it's an email verification error (multiple possible variations)
          if (
            errorMessage.includes("Please verify your email address") ||
            errorMessage.includes("verify your email") ||
            errorMessage.includes("email verification")
          ) {
            // Store email for verification page
            sessionStorage.setItem("signupEmail", formData.email.trim());

            // Show info message
            toast.info("Please verify your email address first");

            // Redirect to verification page after a short delay
            setTimeout(() => {
              router.push(
                `/verify-email?email=${encodeURIComponent(
                  formData.email.trim()
                )}`
              );
            }, 2000);
          } else {
            toast.error("Invalid email or password");
          }
        } else if (error.response?.status === 403) {
          // Check for email verification errors in 403 responses as well
          const errorMessage =
            error.response?.data?.error || error.response?.data?.message || "";

          if (
            errorMessage.includes("Please verify your email address") ||
            errorMessage.includes("verify your email") ||
            errorMessage.includes("email verification")
          ) {
            // Store email for verification page
            sessionStorage.setItem("signupEmail", formData.email.trim());

            // Show info message
            toast.info("Please verify your email address first");

            // Redirect to verification page after a short delay
            setTimeout(() => {
              router.push(
                `/verify-email?email=${encodeURIComponent(
                  formData.email.trim()
                )}`
              );
            }, 2000);
          } else {
            toast.error("Access denied. Please contact support.");
          }
        } else if (error.response?.status === 429) {
          toast.error("Too many login attempts. Please try again later.");
        } else if (error.response?.status >= 500) {
          toast.error("Server error. Please try again later.");
        } else if (error.code === "NETWORK_ERROR") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(
            error.response?.data?.error ||
              error.response?.data?.message ||
              "Login failed. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, bookingInComplete, router, resetForm]
  );

  // Handle keyboard navigation
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && isFormValid) {
        handleSubmit(e);
      }
    },
    [isFormValid, handleSubmit]
  );

  // Initialize component
  useEffect(() => {
    const initializeComponent = () => {
      try {
        // Check for incomplete booking
        const hasIncompleteBooking =
          sessionStorage.getItem("bookingInComplete") === "true";
        setBookingInComplete(hasIncompleteBooking);
      } catch (error) {
        console.error("Error checking localStorage:", error);
      } finally {
        setInitialized(true);
      }
    };

    initializeComponent();
  }, []);

  // Loading state
  if (!initialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <main className="flex justify-center items-center z-50 bg-gray-100 min-h-screen">
        <div className="w-full bg-white h-full flex overflow-hidden relative">
          {/* Left Panel - Sign In Form */}
          <div className="flex justify-center items-center bg-swSecondary50 w-full h-screen sm:w-1/2">
            <div className="max-w-[557px] w-full p-4 sm:p-6 overflow-y-scroll">
              {/* Header */}
              <div className="text-center mb-8">
                <Image
                  src={SWheader}
                  alt="Logo"
                  className="w-48 sm:w-60 mx-auto mb-5"
                />
                <h1 className="text-2xl sm:text-3xl font-semibold text-black mb-2">
                  Welcome Back
                </h1>
                <p className="text-[0.95rem] text-gray-600 leading-relaxed">
                  Sign in to{" "}
                  <span
                    className={`${libreBaskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  to{" "}
                  {bookingInComplete
                    ? "continue your booking"
                    : "manage your bookings"}
                </p>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <InputField
                    label="Email Address"
                    placeholder="Enter your email address"
                    startIcon={<SwMailIcon className="text-xl text-gray-500" />}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => {
                      const error = validateField("email", formData.email);
                      setErrors((prev) => ({ ...prev, email: error }));
                    }}
                    onKeyPress={handleKeyPress}
                    className={errors.email ? "error" : ""}
                    type="email"
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <InputField
                    label="Password"
                    placeholder="Enter your password"
                    startIcon={<SwKeyIcon className="text-xl text-gray-500" />}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => {
                      const error = validateField(
                        "password",
                        formData.password
                      );
                      setErrors((prev) => ({ ...prev, password: error }));
                    }}
                    onKeyPress={handleKeyPress}
                    endIcon={
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
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
                    autoComplete="current-password"
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                <Link
                  href={"/forgot-password"}
                  className="ml-auto italic mt-2 text-sm text-swGray800 cursor-pointer w-fit hover:underline"
                >
                  Forgot Password?
                </Link>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-blue-800">
                    <strong>New user?</strong> After signing up, you&apos;ll
                    need to verify your email address before you can log in.
                    Check your email for the verification code.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  label={loading ? "Signing In..." : "Sign In"}
                  bgColor="bg-swPrimary500 hover:bg-swPrimary600 text-white w-full"
                  onClick={handleSubmit}
                  loader={loading}
                  disabled={isSubmitDisabled}
                  className="transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                />
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-swSecondary50 text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="text-swPrimary400 hover:text-swPrimary600"
                    >
                      Sign up here
                    </Link>
                  </span>
                </div>
              </div>

              {/* Create Account Button */}
              {/* <Button
                startIcon={<SwPlusIcon className="text-xl" />}
                label="Create a new account"
                textColor="font-semibold text-swGray800 border border-swGray100 w-full hover:border-swGray300 hover:bg-gray-50"
                onClick={() => {
                  startTransition(() => {
                    router.push("/sign-up");
                  });
                }}
                className="transition-all duration-200"
              /> */}
            </div>
          </div>

          {/* Right Panel - Background Image */}
          <div className="hidden sm:block w-1/2 bg-cover bg-center bg-no-repeat relative">
            <Image
              src={bgImg}
              fill
              sizes="50vw"
              priority
              quality={90}
              alt="Luxury private jet background"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute right-5 -bottom-10 text-white cursor-pointer z-10">
              <SWLogo className="text-[10rem] drop-shadow-lg" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
