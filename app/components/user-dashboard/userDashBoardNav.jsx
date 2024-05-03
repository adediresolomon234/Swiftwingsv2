import Image from "next/image";
import Link from "next/link";
import { SWLeftArrowIcon, SWNeedhelpIcon, SwLeftRightArrowIcon } from "../svgs";
import logo from "../../../public/images/fullLogo.png";
import Button from "../Button";
import { navItems } from "../NavItems";

const UserDashBoardNav = ({ pageState, setPageState, setNavToggle }) => {
  return (
    <div className="max-h-screen h-full rounded-xl bg-white flex flex-col justify-between items-between pt-12 px-5 pb-2 gap-8">
      <div className="p-5 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href={"/"}>
            <Image src={logo} alt="" />
          </Link>

          <div
            className="rounded-full p-2 hover:bg-swGray50 cursor-pointer xl:hidden block"
            onClick={() => setNavToggle(false)}
          >
            <SWLeftArrowIcon className="text-xl" />
          </div>
        </div>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div
              className={`${
                pageState === item.state
                  ? "text-swPrimary500 font-semibold"
                  : "text-swGray700"
              } flex items-center justify-between cursor-pointer`}
              key={item.id}
              onClick={() => {
                setPageState(item.state);
                setNavToggle(false);
              }}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {pageState === item.state && (
                <div className="h-5 p-[0.2rem] rounded-full bg-swPrimary500" />
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-5 shadow-md rounded-md w-full mb-3">
        <div className="flex items-center mb-2">
          <SWNeedhelpIcon className="text-xl" />
          <span className="ml-2">Need Help?</span>
        </div>
        <p className="mb-4 text-xs">We can attend to any booking issues</p>
        <Button
          label={"Contact support"}
          textColor={
            "w-full text-swPrimary500 border border-swGray100 hover:bg-swPrimary500 hover:text-swSecondary50"
          }
        />
      </div>
    </div>
  );
};

export default UserDashBoardNav;
