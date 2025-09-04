import React, { useState } from "react";
import Button from "../Button";
import { SWClose } from "../svgs";
import { CalendarIcon } from "@mui/x-date-pickers";
import SelectOnlyDate from "../../../utils/SelectOnlyDate";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { fetchPaginatedEmptyLegs } from "../../../redux/slices/emptylegs";

const EmptyLegDateFilter = () => {
  const dispatch = useDispatch();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setStartDate("");
    setEndDate("");
  };

  const handleSubmit = () => {
    dispatch(
      fetchPaginatedEmptyLegs({
        page: 1,
        limit: 12,
        search: "",
        startDate,
        endDate,
      })
    );
    handleClose();
  };
  const handleReset = () => {
    dispatch(
      fetchPaginatedEmptyLegs({
        page: 1,
        limit: 12,
        search: "",
        startDate: "",
        endDate: "",
      })
    );
    handleClose();
  };

  return (
    <div>
      <Button
        bgColor="bg-swPrimary400 hover:bg-swPrimary600 text-white"
        label="Filter By Date"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <main className="fixed flex justify-center items-center h-[100vh] w-full top-0 left-0 bg-black bg-opacity-25 z-[200]">
          <div className="max-w-sm w-full p-5 bg-white rounded-3xl">
            <div
              className="text-swPrimary500 cursor-pointer p-1 rounded-full border w-fit ml-auto hover:bg-swPrimary50"
              onClick={() => handleClose()}
            >
              <SWClose className="text-md text-swPrimary500" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg">Filter Empty Legs By Date</p>
              <div className="flex flex-col gap-5 mt-5 w-full">
                <div>
                  <label className="text-sm">Start Date</label>
                  <div
                    onClick={() => setStartDateOpen(true)}
                    className="p-2 border border-swPrimary500 w-full rounded-md flex items-center cursor-pointer"
                  >
                    <input
                      type="text"
                      disabled={true}
                      value={startDate}
                      className="focus:outline-none w-full bg-transparent cursor-pointer pointer-events-none"
                    />
                    <CalendarIcon className="text-swPrimary500" />
                  </div>
                </div>
                <div>
                  <label className="text-sm">End Date</label>
                  <div
                    onClick={() => setEndDateOpen(true)}
                    className="p-2 border border-swPrimary500 w-full rounded-md flex items-center cursor-pointer"
                  >
                    <input
                      type="text"
                      disabled={true}
                      value={endDate}
                      className="focus:outline-none w-full bg-transparent cursor-pointer pointer-events-none"
                    />

                    <CalendarIcon className="text-swPrimary500" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5 mt-5 w-full">
                <Button
                  label="Apply"
                  bgColor="bg-swPrimary400 hover:bg-swPrimary500 text-white w-full"
                  onClick={handleSubmit}
                />
                <Button
                  label="Reset"
                  bgColor="bg-swGray500 text-white w-full"
                  onClick={handleReset}
                />
              </div>
            </div>
          </div>
        </main>
      )}
      <SelectOnlyDate
        isOpen={startDateOpen}
        onChange={(value) =>
          setStartDate(dayjs(`${value}`).format("YYYY-MM-DD"))
        }
        onAccept={() => setStartDateOpen(false)}
        onClose={() => setStartDateOpen(false)}
      />
      <SelectOnlyDate
        isOpen={endDateOpen}
        onChange={(value) => setEndDate(dayjs(`${value}`).format("YYYY-MM-DD"))}
        onAccept={() => setEndDateOpen(false)}
        onClose={() => setEndDateOpen(false)}
      />
    </div>
  );
};

export default EmptyLegDateFilter;
