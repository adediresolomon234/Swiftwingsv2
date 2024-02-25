// import { Children } from "react";
"use client";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Children } from "react";

const NavAndFooter = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div >{children}</div>
      <Footer />
    </div>
  );
};

export default NavAndFooter;
