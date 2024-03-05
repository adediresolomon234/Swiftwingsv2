import { Space_Grotesk } from "next/font/google";
import PhoneExt from "../components/shared/phoneInputField"
import InputField from "../components/shared/InputField";
import  ModalPopup from "../components/shared/Modal";
import {
    SwGoogleColoredIcon,
    SwKeyIcon,
    SwMailIcon,
    SwOpenEyeIcon,
    SwPlusIcon,
    SWArrowsChevron,
} from "../components/svgs";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const ProfilePage = () => {
    return (
        <main className="flex justify-center items-center min-h-[100vh]">
            <div className="max-w-sm w-full p-2 mt-20">
                <p className="text-center text-2xl font-medium">Complete your profile</p>
                <p className="text-center mt-5 mb-8 text-[1rem]">
                    Provide sufficient details to complete your booking, It’s a one time thing.
                </p>
                <div className="w-full">
                    <div className="inline-block relative w-full">
                        <label htmlFor="title" className="font-medium text-swGray900 mb-2 text-lg">Title</label>
                        <div className="flex items-center">
                            <select id="title" name="title" className="block appearance-none text-swGray900 w-full bg-white border border-swGray100  hover:border-swPrimary500  px-4 py-3 pr-10 rounded-lg leading-tight focus:outline-none">
                                <option value="" disabled selected hidden>Select an option</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Miss</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 mt-6 text-gray-700">
                                <SWArrowsChevron className="text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"First name"}
                        placeholder={"Enter your first name"}
                    />
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Last name"}
                        placeholder={"Last your first name"}
                    />
                </div>
                <div className="w-full mt-5">
                    <PhoneExt />
                </div>
                <div className="my-7 flex flex-col gap-3">
                  <ModalPopup/>
                </div>
                <div class="w-full flex items-center">
                    <input id="link-checkbox" type="checkbox" value="" class="w-5 h-5 text-swPrimary500  bg-gray-100 border-gray-300 rounded focus:outline-none cursor-pointer" />
                    <label for="link-checkbox" class="ms-6 text-xs font-medium text-swGray600  dark:text-gray-300">I would like to receive marketing communications from Swiftwings.</label>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
