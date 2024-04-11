"use client"
import React from "react";
import { Button } from "@mui/material";
import TopSectionPage from "../components/shared/user-dashboard/TopSection";
import Image from "next/image";
import logo from "../../public/images/fullLogo.png";
import Link from "next/link";
import { navItems } from "../components/NavItems";
import { SWNeedhelpIcon } from "../components/svgs";
import ProfileCard from "../components/shared/ProfileCard";
import UpdatepasswordCard from "../components/shared/UpdatePasswordCard"


const UserProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-swPrimary50 pt-3 px-4 pb-6 ">
      <div className="max-h-screen w-98 rounded-xl bg-white flex flex-col items-start justify-start pt-12 px-10 pb-2 gap-8">
        <div className="flex items-center mb-8">
          <Link href={"/"}>
            <Image src={logo} alt="" />
          </Link>
        </div>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link className="flex items-center space-x-8 text-primary-500" href={item.href} key={item.id}>
              {item.icon}
              <span>{item.name}</span>

            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="flex items-center mb-2">
            <SWNeedhelpIcon className="text-xl" />
            <span className="ml-2">Need Help?</span>
          </div>
          <p className="mb-4 text-sm">We can attend to any booking issues</p>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#5c0632",
              fontSize: "16",
              fontStyle: "bold",
              background: "#fff",
              borderRadius: "32px",
              "&:hover": { background: "#fff" },
            }}
          >
            Contact support
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full p-4 md:overflow-auto">
        <TopSectionPage />
        <div className="rounded-xl bg-white p-4 mt-4">
          <ProfileCard />
        </div>
        <div className="rounded-xl bg-white p-4 mt-4">
          <UpdatepasswordCard />
        </div>
        <Button className="flex w-max items-end gap-4 mt-12 bg-white rounded-xl text-swGray800">
          Log out
        </Button>
      </div>

    </div>
  );
};

export default UserProfilePage;
