import Link from "next/link";
import Button from "../Button";
import logo from "../../../public/images/fullLogo.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const NavBar = ({ Nav }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      try {
        const getUser = JSON.parse(userItem);
        setUser(getUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <main className="w-full fixed z-50 top-0 left-0">
      <div className="w-full flex justify-between items-center py-5 px-10 backdrop-blur bg-white/50 text-swGray800 text-lg border-b-2">
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>

        {Nav === false ? (
          ""
        ) : (
          <div className="flex gap-8">
            <Link href={"/fleet-page"} className="py-2 px-4 rounded-full hover:bg-white">
              Fleets
            </Link>
            <Link href={"/destinations"} className="py-2 px-4 rounded-full hover:bg-white">
              Destination
            </Link>
            <Link href={""} className="py-2 px-4 rounded-full hover:bg-white">
              Company{" "}
            </Link>
            <Link href={""} className="py-2 px-4 rounded-full hover:bg-white">
              Contact Us
            </Link>
          </div>
        )}

        <div className="text-sm">
          {user?.isLoggedIn ? (
            <Link
              href="/sign-in"
              className="py-2 px-4 rounded-full text-lg text-white bg-swPrimary500 hover:bg-swPrimary600 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("user");
              }}
            >
              Log out
            </Link>
          ) : (
            <div className="flex gap-5 items-center">
              <Link
                href="/sign-in"
                className="py-2 px-4 rounded-full hover:bg-white text-lg"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="py-2 px-4 rounded-full text-lg text-white bg-swPrimary500 hover:bg-swPrimary600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default NavBar;
