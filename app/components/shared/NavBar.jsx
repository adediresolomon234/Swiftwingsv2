import Link from "next/link";
import Button from "../Button";
import logo from "../../../public/images/fullLogo.png";
import Image from "next/image";

const NavBar = () => {
  return (
    <main className="w-full fixed z-50 top-0 left-0">
      <div className="w-full flex justify-between items-center py-7 px-10 backdrop-blur bg-white/50 text-swGray800 text-lg">
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>

        <div className="flex gap-8">
          <Link href={""} className="py-2 px-4 rounded-full hover:bg-white">
            Fleets
          </Link>
          <Link href={""} className="py-2 px-4 rounded-full hover:bg-white">
            Destination
          </Link>
          <Link href={""} className="py-2 px-4 rounded-full hover:bg-white">
            Company{" "}
          </Link>
          <Link href={""} className="py-2 px-4 rounded-full hover:bg-white">
            Contact Us
          </Link>
        </div>

        <div className="flex gap-5 items-center text-sm">
          <Link
            href="/sign-in"
            className="py-2 px-4 rounded-full hover:bg-white text-lg"
          >
            Sign In
          </Link>
          <Button
            label={"Sign Up"}
            textColor={"text-white"}
            bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
          />
        </div>
      </div>
    </main>
  );
};

export default NavBar;
