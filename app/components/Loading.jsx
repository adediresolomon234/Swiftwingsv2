import Image from "next/image";
import logo from "@/public/images/fullLogo.png";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Image src={logo} alt="Loading" className="pulsate" />
    </div>
  );
};

export default Loading;
