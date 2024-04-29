import { useState } from "react";
import { SWFilterIcon, SwSearchIcon, SwSortIcon } from "../../svgs";
import dayjs from "dayjs";

const Bookings = () => {
  const [search, setSearch] = useState("");
  const data = [
    {
      bookDate: "2024-05-24",
      bookingTime: "01:00",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "One Way",
      status: "New",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "01:00",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "Round Trip",
      status: "Processing",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "01:00",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "Multi-city Trip",
      status: "Cancelled",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "1:0",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "Multi-city Trip",
      status: "Completed",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "01:00",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "One Way",
      status: "New",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "01:00",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "Round Trip",
      status: "Processing",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "01:00",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "Multi-city Trip",
      status: "Cancelled",
    },
    {
      bookDate: "2024-05-24",
      bookingTime: "1:0",
      sourceCountry: "Nigeria",
      destinationCountry: "Dubai",
      bookingId: "ID-29485",
      tripType: "Multi-city Trip",
      status: "Completed",
    },
  ];
  return (
    <main className="bg-white p-5 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-xl text-swGray600">All your booking in one place</p>
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
          <div className="rounded-full py-2 px-4 font-medium text-swPrimary500 border flex gap-2 items-center">
            <p>Filter</p>
            <SwSortIcon className="text-xl" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        {data.map((item) => (
          <div
            key={item.bookingId}
            className="flex justify-between p-5 items-center text-swGray800 hover:bg-swGray50 rounded-lg"
          >
            <div className="flex items-center gap-5">
              <div className="w-40">
                <p className="text-lg font-medium">
                  {dayjs(`${item.bookDate} ${item.bookingTime}`).format(
                    "D MMM, YYYY"
                  )}
                </p>
                <p className="text-swGray600 text-sm">
                  {dayjs(`${item.bookDate} ${item.bookingTime}`).format(
                    "h:mm a"
                  )}
                </p>
              </div>

              <div className="w-40">
                <p className="text-lg font-medium">
                  {item.sourceCountry} - {item.destinationCountry}
                </p>
                <p className="text-swGray600 text-sm">NIG - DUB</p>
              </div>
            </div>

            {/*  */}

            <div className="flex gap-5 items-center">
              <div className="w-40">
                <p className="text-sm text-swGray600">Booking ID</p>
                <p className="text-lg font-medium">{item.bookingId}</p>
              </div>
              <div className="w-40">
                <p className="text-sm text-swGray600">Flight type</p>
                <p className="text-lg font-medium">{item.tripType}</p>
              </div>
              <div className="flex items-center w-32">
                <div
                  className={`text-white rounded-full py-2 px-4 ${
                    item.status === "New"
                      ? "bg-[#CBC419]"
                      : item.status === "Processing"
                      ? "bg-[#196BCB]"
                      : item.status === "Completed"
                      ? "bg-[#33CB19]"
                      : "bg-[#CB2419]"
                  }`}
                >
                  {item.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Bookings;
