// import { Children } from "react";
"use client";
import Footer from "./Footer";
import NavBar from "./NavBar";


const NavAndFooter = ({ children, Nav }) => {
  return (
    <div>
      <NavBar Nav={Nav} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default NavAndFooter;
