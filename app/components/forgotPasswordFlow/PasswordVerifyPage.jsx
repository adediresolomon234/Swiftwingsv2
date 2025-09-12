"use client";
import { useEffect, useState } from "react";
import NavBar from "../../components/shared/NavBar";
import Loading from "../../components/Loading";
import Link from "next/link";
import Image from "next/image";
import SWheader from "../../../public/images/SWheader.png";
import { IoArrowBack } from "react-icons/io5";
import TokenInput from "./TokenInputComp";
import ChangePasswordComp from "./ChangePasswordComp";

const PasswordVerifyPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loader, setLoader] = useState(true);
  const [pageState, setPageState] = useState(0);
  const [formData, setFormData] = useState({
    password: "",
    token: "",
  });

  useEffect(() => {
    if (window !== "undefined") {
      const email = localStorage.getItem("4gtPwdEmail") ?? "";
      setUserEmail(email);
      setLoader(false);
    }
  }, []);

  if (loader) {
    return <Loading />;
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <main className="flex justify-center items-center min-h-screen bg-swSecondary50">
        <NavBar Nav={false} />
        <div className="max-w-sm w-full p-4 flex flex-col items-center">
          <div className="w-full">
            {pageState === 1 && (
              <IoArrowBack
                size={25}
                className="text-swPrimary500 mb-3"
                onClick={() => setPageState(0)}
              />
            )}
            <div className="w-full flex justify-center items-center">
              <Link href={"/"} className="mb-5">
                <Image src={SWheader} alt="Logo" className="w-60 " />
              </Link>
            </div>
          </div>
          {pageState === 0 && (
            <TokenInput
              pageState={pageState}
              setPageState={setPageState}
              userEmail={userEmail}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {pageState === 1 && (
            <ChangePasswordComp
            pageState={pageState}
              setPageState={setPageState}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default PasswordVerifyPage;
