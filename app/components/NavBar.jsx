import Link from "next/link";
import Button from "./Button";
import logo from "../../public/images/Logo (1).png";
import Image from "next/image";

const NavBar = () => {
  return (
    <main className="w-full fixed z-10 top-0 left-0 px-5">
      <div className="w-full flex justify-between items-center py-7 px-10 bg-swWine text-white text-lg">
        <div>
          <Image src={logo} alt="" />
        </div>

        <div className="flex gap-8">
          <p>Fleets</p>
          <p>Destination</p>
          <div>Company </div>
          <p>Contact Us</p>
        </div>

        <div className="flex gap-5 items-center text-sm">
          <Link href="" className="text-lg">
            Sign In
          </Link>
          <Button label={"Sign Up"} textColor={"text-swDarkGray"} />
        </div>
      </div>
    </main>
  );
};

export default NavBar;
