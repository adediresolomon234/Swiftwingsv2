import React, { useEffect, useRef } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineCheck } from "react-icons/ai";
import ReactDOM from "react-dom";

const PassengerSelector = ({
  adults,
  childrenprop,
  onAdultChange,
  onChildChange,
  onClose,
  isOpen,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed top-0 left-0 h-full w-full inset-0 z-50 flex items-center justify-center bg-black/25">
      <div ref={modalRef} className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <p className="text-lg font-semibold mb-5">Passengers</p>

        <div className="space-y-4 mb-5">
          {/* Adults */}
          <div className="flex justify-between items-center">
            <p className="text-base">Adults</p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="p-2 hover:bg-gray-100"
                onClick={() => onAdultChange("sub")}
              >
                <AiOutlineMinus size={20} />
              </button>
              <p className="w-12 text-center border-l border-r border-gray-300 py-2 text-base">
                {adults}
              </p>
              <button
                className="p-2 hover:bg-gray-100"
                onClick={() => onAdultChange("add")}
              >
                <AiOutlinePlus size={20} />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center">
            <p className="text-base">Children</p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="p-2 hover:bg-gray-100"
                onClick={() => onChildChange("sub")}
              >
                <AiOutlineMinus size={20} />
              </button>
              <p className="w-12 text-center border-l border-r border-gray-300 py-2 text-base">
                {childrenprop}
              </p>
              <button
                className="p-2 hover:bg-gray-100"
                onClick={() => onChildChange("add")}
              >
                <AiOutlinePlus size={20} />
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm italic text-gray-600 mb-4">
          Please specify at least one adult
        </p>

        <button
          className="w-full bg-swPrimary500 text-white flex items-center justify-center gap-2 py-2 rounded-md hover:bg-swPrimary700 transition"
          onClick={onClose}
        >
          <span className="text-base font-medium">Save</span>
          <AiOutlineCheck size={20} />
        </button>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.body);
};

export default PassengerSelector;
