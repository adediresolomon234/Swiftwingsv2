import { useEffect, useState } from "react";
import { SWFilterIcon, SwSearchIcon, SwSortIcon } from "../svgs";
import dayjs from "dayjs";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getAllBooking } from "@/redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";

const AllBookings = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "01:00",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "One Way",
  //     status: "New",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "01:00",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "Round Trip",
  //     status: "Processing",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "01:00",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "Multi-city Trip",
  //     status: "Cancelled",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "1:0",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "Multi-city Trip",
  //     status: "Completed",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "01:00",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "One Way",
  //     status: "New",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "01:00",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "Round Trip",
  //     status: "Processing",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "01:00",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "Multi-city Trip",
  //     status: "Cancelled",
  //   },
  //   {
  //     bookDate: "2024-05-24",
  //     bookingTime: "1:0",
  //     sourceCountry: "Nigeria",
  //     destinationCountry: "Dubai",
  //     bookingId: "ID-29485",
  //     tripType: "Multi-city Trip",
  //     status: "Completed",
  //   },
  // ];

  const getAllBookings = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("user", user.email);
    dispatch(getAllBooking(user.email))
      .unwrap()
      .then((res) => {
        if (res.success == true) {
          setData(res?.data);
          console.log(res);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <main className="bg-white p-5 rounded-xl">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <p className="text-xl hidden md:block text-swGray600">
          All your booking in one place
        </p>
        <div className="flex items-center gap-5">
          <div className="flex gap-2 border rounded-md p-2">
            <SwSearchIcon className="text-2xl text-swGray600 " />
            <input
              type="text"
              placeholder="Search Bookings"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none focus:outline-none w-full h-full"
            />
          </div>
          <div className="rounded-full py-2 px-4 font-medium text-swPrimary500 border flex gap-2 items-center hover:bg-swGray50 cursor-pointer">
            <p>Filter</p>
            <SwSortIcon className="text-xl" />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full">
        {data.length > 0 ? (
          data
            .filter(
              (item) =>
                item?.booking_details?.formData[0]?.destination?.country
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                item?.booking_details?.formData[0]?.source?.country
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
            )
            .map((item) => (
              <Link
                href={`/user-dashboard?page=bookings&id=${item?.booking_number}`}
                key={item?.booking_number}
                className=" text-swGray800  rounded-lg w-full "
              >
                <div className="flex justify-between items-center gap-5 w-full flex-wrap pb-2 border-b hover:bg-swGray50 p-5">
                  <div className="">
                    <p className="md:text-lg text-sm font-medium">
                      {dayjs(item?.created_date).format("D MMM, YYYY")}
                    </p>
                    <p className="text-swGray600 text-xs">
                      {dayjs(item?.created_date).format("h:mm a")}
                      {/* {format(item?.created_date, "h:mm a")} */}
                    </p>
                  </div>

                  <div className="">
                    <p className="text-sm text-swGray600">Trip type</p>
                    <p className="md:text-lg text-xs font-medium">
                      {item?.booking_details?.tripType}
                    </p>
                  </div>

                  <div className="">
                    <p className="md:text-lg text-xs  font-medium">
                      {item?.booking_details?.formData[0]?.source?.country} -{" "}
                      {item?.booking_details?.formData[0]?.destination?.country}
                    </p>
                    <div className="text-swGray600 text-sm flex">
                      <p>
                        {item?.booking_details?.formData[0]?.source?.iata_code}
                      </p>{" "}
                      -{" "}
                      <p>
                        {
                          item?.booking_details?.formData[0]?.destination
                            ?.iata_code
                        }
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-sm text-swGray600">Booking ID</p>
                    <p className="md:text-lg text-xs font-medium">
                      {item.booking_number}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`text-white text-xs rounded-full py-2 px-4 ${
                        item?.status === "New"
                          ? "bg-[#CBC419]"
                          : item.status === "Processing"
                          ? "bg-[#196BCB]"
                          : item.status === "Completed"
                          ? "bg-[#33CB19]"
                          : "bg-[#CB2419]"
                      }`}
                    >
                      {item?.status}
                    </div>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <div>No bookings found</div>
        )}
      </div>
    </main>
  );
};

export default AllBookings;
