import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight } from "@mdi/js";
import {
  BronzeWing,
  GoldWing,
  SilverWing,
  SWTLiveLocation,
} from "../../components/svgs";
import { useRouter } from "next/navigation";
import "../shared/Fleetspec/fleetspec.css";
import Image from "next/image";
import Link from "next/link";
import redCircle from "../svgs/Redcircle.gif";
import Loading from "../Loading";
import { useEffect, useState } from "react";

const AircraftCard = ({ aircraft }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { model, image, speed, feet, name, features, location, id, rank } =
    aircraft;

  useEffect(() => {
    if (aircraft) {
      setLoading(false);
    }
  }, [aircraft]);

  if (loading) {
    <Loading />;
  }

  return (
    <Link
      href={`/fleet-specification/${aircraft?.id}`}
      className="flex flex-col items-center justify-center pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular"
    >
      <div className="relative h-full">
        {image ? (
          <img
            className="w-full rounded-xl h-full object-cover image-container"
            src={image}
            alt={`Image of ${model}`}
            width={300}
            height={200}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="self-stretch relative leading-6 font-medium mt-3 text-xl mb-3 flex justify-center items-center gap-3">
        {name}
        {rank && rank === 3 && <GoldWing className="h-5 w-10" />}
        {rank && rank === 2 && <SilverWing className="h-5 w-10" />}
        {rank && rank === 1 && <BronzeWing className="h-5 w-10" />}
      </div>
      <div className="self-stretch flex justify-center gap-4 py-3 px-1 text-center text-sm text-gray-800">
        <div className="flex items-center">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiCarSeat} />
          </svg>
          <div className="relative leading-4.5 ml-3 ">
            {features?.no_of_seats} seats
          </div>
        </div>
        <div className="flex items-center">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiSpeedometer} />
          </svg>
          <div className="relative leading-4 ml-3">{speed}</div>
        </div>
        <div className="flex items-center">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiArrowLeftRight} />
          </svg>
          <div className="relative leading-4.5 ml-3 ">{feet}</div>
        </div>
        <div className="flex items-center">
          <Image
            src={redCircle}
            alt={`Image of ${model}`}
            width={20}
            height={20}
          />
          <div className="relative leading-4.5 ml-3  ">{location}</div>
        </div>
      </div>
    </Link>
  );
};

export default AircraftCard;
