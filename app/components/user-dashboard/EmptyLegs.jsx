import { useEffect, useRef, useState } from "react";
import { SwSearchIcon, SwSortIcon } from "../svgs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  getAllBooking,
  getEmptyLegsBooking,
} from "../../../redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EmptyLegsBookings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [filter, setFilter] = useState("New");
  const toggleButtonRef = useRef(null);

  const handleFilter = (status) => {
    setFilter(status);
    setFilterDropDown(false);
  };

  const getAllBookings = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      dispatch(getEmptyLegsBooking(user?.email))
        .unwrap()
        .then((res) => {
          if (res.success == true) {
            setData(res?.data);
          } else {
            toast.error(res.message);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setFilterDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(data);

  return (
    <main className="bg-white p-5 rounded-xl min-h-72">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <p className="text-xl hidden md:block text-swPrimary500">
          All your emptylegs in one place
        </p>
        <div className="flex items-center gap-5">
          {/* <div className="flex gap-2 border rounded-md p-2">
            <SwSearchIcon className="text-2xl text-swGray600 " />
            <input
              type="text"
              placeholder="Search Bookings"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none focus:outline-none w-full h-full"
            />
          </div> */}
          {/* <div className="relative">
            <div
              className="rounded-full py-2 px-4 font-medium text-swPrimary500 border flex gap-2 items-center hover:bg-swGray50 cursor-pointer"
              onClick={() => setFilterDropDown(!filterDropDown)}
            >
              <p>Filter</p>
              <SwSortIcon className="text-xl" />
              {filterDropDown && (
                <div className="absolute top-0 left-0 h-full w-full" />
              )}
            </div>

            <div>
              {filterDropDown && (
                <div
                  ref={toggleButtonRef}
                  className={`absolute w-[15rem] right-0 top-full mt-3 sm:mt-3 p-3 bg-white rounded-lg border  ${
                    filterDropDown ? "min-h-10" : "h-0"
                  }`}
                >
                  <div className="w-full flex flex-col">
                    <div
                      className="w-full hover:bg-swPrimary400 hover:text-white rounded-md p-3 cursor-pointer flex items-center gap-3"
                      onClick={() => handleFilter("New")}
                    >
                      New
                    </div>
                    <div
                      className="w-full hover:bg-swPrimary400 hover:text-white rounded-md p-3 cursor-pointer flex items-center gap-3"
                      onClick={() => handleFilter("Completed")}
                    >
                      Completed
                    </div>
                    <div
                      className="w-full hover:bg-swPrimary400 hover:text-white rounded-md p-3 cursor-pointer flex items-center gap-3"
                      onClick={() => handleFilter("Cancelled")}
                    >
                      Cancelled
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <div className="hidden sm:block overflow-x-auto">
        <table className="mt-5 w-full">
          <tbody className="w-full">
            {data?.length > 0 ? (
              data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-5">
                    No emptylegs found
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    // onClick={() =>
                    //   router.push(
                    //     `/user-dashboard?page=bookings&id=${item?.booking_number}`
                    //   )
                    // }
                    key={item?.booking_number}
                    className=" text-swGray800 hover:bg-swGray50 cursor-pointer rounded w-full"
                  >
                    <td className="whitespace-nowrap p-5">
                      <p className="md:text-sm text-sm font-medium">
                        {dayjs(item?.createdAt).format("D MMM, YYYY")}
                      </p>
                      <p className="text-swGray600 text-xs">
                        {dayjs(item?.createdAt).format("h:mm a")}
                      </p>
                    </td>
                    <td className="whitespace-nowrap p-5">
                      <p className="text-sm text-swGray600">Aircraft</p>
                      <p className="md:text-sm text-xs font-medium">
                        {item?.aircraft}
                      </p>
                    </td>
                    <td className="whitespace-nowrap p-5">
                      <p className="text-sm text-swGray600">Departure</p>
                      <p className="md:text-sm text-xs font-medium">
                        {item?.departure}
                      </p>
                    </td>
                    <td className="whitespace-nowrap p-5">
                      <p className="text-sm text-swGray600">Arrival</p>
                      <p className="md:text-sm text-xs font-medium">
                        {item?.arrival}
                      </p>
                    </td>
                    <td className="whitespace-nowrap p-5">
                      <p className="text-sm text-swGray600">Flight Date</p>
                      <p className="md:text-sm text-xs font-medium">
                        {dayjs(item?.dates).format("D MMM, YYYY")}
                      </p>
                    </td>
                    <td className="whitespace-nowrap p-5">
                      <p className="text-sm text-swGray600">Offer</p>
                      <p className="md:text-sm text-xs font-medium">
                        ${item?.offer?.toLocaleString()}
                      </p>
                    </td>
                    <td className="whitespace-nowrap flex items-center p-5">
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
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-5">
                  No emptylegs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden flex flex-col gap-5 mt-10">
        {data?.length > 0 ? (
          data?.length === 0 ? (
            <div className="text-center">No emptylegs found</div>
          ) : (
            data?.map((item) => (
              <div
                // onClick={() =>
                //   router.push(
                //     `/user-dashboard?page=bookings&id=${item?.booking_number}`
                //   )
                // }
                key={item?.booking_number}
                className="border rounded-md p-5"
              >
                <div
                  className={`text-white text-xs rounded-full w-fit ml-auto mb-3 py-2 px-4 ${
                    item?.status === "New"
                      ? "bg-[rgb(203,196,25)]"
                      : item.status === "Processing"
                      ? "bg-[#196BCB]"
                      : item.status === "Completed"
                      ? "bg-[#33CB19]"
                      : "bg-[#CB2419]"
                  }`}
                >
                  {item?.status}
                </div>
                <div className="flex items-center justify-between flex-wrap">
                  <div>
                    <p className="text-sm text-swGray600">Aircraft</p>
                    <p>{item?.aircraft}</p>
                  </div>
                </div>
                <div className="flex justify-between gap-3">
                  <div className="flex flex-col mt-3 gap-3 flex-wrap">
                    <div className="flex items-center justify-between gap-3">
                      <div className="">
                        <p>Departure</p>
                        <p>{item?.departure}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="">
                        <p>Arrival</p>
                        <p>{item?.arrival}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-3 gap-3 flex-wrap">
                    <div className="flex items-center justify-between gap-3">
                      <div className="">
                        <p className="whitespace-nowrap">Flight Date</p>
                        <p>{dayjs(item?.dates).format("D MMM, YYYY")}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="">
                        <p className="whitespace-nowrap">Offer</p>
                        <p>${item?.offer?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <div className="flex flex-col gap-3">
                      <div className="w-28 mt-3">
                        <p className=" text-swGray600">Flight Date</p>
                        <p className="md:text-lg  font-medium">
                          {dayjs(item?.dates).format("D MMM, YYYY")}
                        </p>
                      </div>
                      <div className="w-28 mt-3">
                        <p className=" text-swGray600">Offer</p>
                        <p className="md:text-lg  font-medium">
                          ${item?.offer?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))
          )
        ) : (
          <div className="text-center">No emptylegs found</div>
        )}
      </div>
    </main>
  );
};

export default EmptyLegsBookings;
