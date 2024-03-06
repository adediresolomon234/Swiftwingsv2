import { Space_Grotesk } from "next/font/google";
import Button from "../components/Button";

import InputField from "../components/shared/InputField";
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
    return (
        <main className="flex justify-center items-center min-h-[100vh]">
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
                    />
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Password"}
                        placeholder={"Enter password"}
                        startIcon={<SwKeyIcon className="text-xl" />}
                        endIcon={<SwOpenEyeIcon className="text-xl" />}
                    />
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Re-enter password"}
                        placeholder={"Re-enter password"}
                        startIcon={<SwKeyIcon className="text-xl" />}
                        endIcon={<SwOpenEyeIcon className="text-xl" />}
                    />
                </div>
                <div className="my-7 flex flex-col gap-3">
                    <Button
                        label={"Sign In"}
                        bgColor={"bg-swPrimary500 text-white w-full"}
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
