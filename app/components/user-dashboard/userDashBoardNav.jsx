"use client";
import Image from "next/image";
import Link from "next/link";
import { InstructionIcon, SWLeftArrowIcon } from "../svgs";
import SWheader from "../../../public/images/SWheader.png";
import { navItems } from "../NavItems";
import { useRouter, useSearchParams } from "next/navigation";
import { GoSignOut } from "react-icons/go";

const UserDashBoardNav = ({ setNavToggle }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSignOut = () => {
    sessionStorage.removeItem("user");
    router.push("/");
  };
  return (
    <div className="max-h-screen h-full border-r border-swGray200 bg-white flex flex-col justify-between items-between pb-2 gap-8 overflow-y-auto">
      <div className="p-5 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href={"/"}>
            <Image src={SWheader} alt="Logo" className="w-48 sm:w-60 " />
          </Link>

          <div
            className="rounded-full p-2 hover:bg-swGray50 cursor-pointer xl:hidden block"
            onClick={() => {
              setNavToggle && setNavToggle(false);
            }}
          >
            <SWLeftArrowIcon className="text-xl" />
          </div>
        </div>
        <nav className="flex flex-col space-y-8">
          {navItems.map((item) => (
            <Link
              href={`/user-dashboard?page=${item.state}`}
              className={`${
                searchParams.get("page") === item.state
                  ? "text-swPrimary500 font-semibold"
                  : "text-swGray700"
              } flex items-center justify-between cursor-pointer`}
              key={item.id}
              onClick={() => {
                setNavToggle && setNavToggle(false);
              }}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {searchParams.get("page") === item.state && (
                <div className="h-5 p-[0.2rem] rounded-full bg-swPrimary500" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-5 pb-0 rounded-md w-full mb-3">
        <div className="p-2 text-center border border-swWarning500 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <InstructionIcon color="#F79009" className="text-xl" />
            <span className="ml-2">Need Help?</span>
          </div>
          <p className="text-sm">Contact support for booking issues</p>
        </div>

        <button
          className="mb-5 mt-1 flex items-center gap-5 w-full rounded-full border text-[16px] font-medium border-swGray100 text-swPrimary500 hover:bg-swPrimary500 hover:text-white h-[36px] justify-center"
          onClick={handleSignOut}
        >
          Call support
        </button>
        <button
          className="flex items-center gap-2 text-swError500"
          onClick={handleSignOut}
        >
          <GoSignOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashBoardNav;
