// import { Children } from "react";
"use client";
import Footer from "./Footer";
import NavBar from "./NavBar";

const NavAndFooter = ({ children, Nav }) => {
  return (
    <div>
      <NavBar Nav={Nav} />
      <div>{children}</div>
      <div className="md:px-4 relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default NavAndFooter;
