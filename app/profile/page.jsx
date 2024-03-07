"use client";
import { Space_Grotesk } from "next/font/google";
import CustomSelect from "../components/shared/CustomSelete";
import InputField from "../components/shared/InputField";
import PhoneExt from "../components/shared/phoneInputField";
import ModalPopup from "../components/shared/Modal"
import "../../styles.css"

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const ProfilePage = () => {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="max-w-sm w-full p-2 mt-20">
                <p className="text-center text-2xl font-medium">Complete your profile</p>
                <p className="text-center mt-5 mb-8 text-lg">
                    Provide sufficient details to complete your booking, It’s a one time thing.
                </p>
                <div className="w-full mt-5">
                    <CustomSelect />
                </div>
                <div className="w-full mt-5 ">
                    <InputField
                        label={"First name"}
                        placeholder={"Enter your first name"}
                    />
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Last name"}
                        placeholder={"Enter your last name"}
                    />
                </div>
                <div className="w-full mt-5">
                    <PhoneExt />
                </div>
                <div className="my-7 flex flex-col gap-3">
                    <ModalPopup />
                </div>
                <div className="w-full flex items-center">
                    <input id="link-checkbox" type="checkbox" value="" className="w-5 h-5 text-swPrimary500 bg-gray-100 border-gray-300 rounded focus:outline-none cursor-pointer" />
                    <label htmlFor="link-checkbox" className="ms-6 text-xs font-medium text-swGray600">I would like to receive marketing communications from Swiftwings.</label>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;