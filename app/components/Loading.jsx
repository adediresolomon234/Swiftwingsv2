import Image from "next/image";
import SWheader from "../../public/images/SWheader.png";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Image src={SWheader} alt="Loading" className="pulsate w-60" />
    </div>
  );
};

export default Loading;
