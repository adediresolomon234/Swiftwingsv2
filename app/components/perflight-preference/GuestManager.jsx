"use client";
import { useState } from "react";
import InputField from "../shared/InputField";

const GuestManager = ({ label, guests, onChange }) => {
  const [newGuest, setNewGuest] = useState("");

  const addGuest = () => {
    if (newGuest.trim()) {
      onChange([...guests, newGuest.trim()]);
      setNewGuest("");
    }
  };

  const removeGuest = (index) => {
    onChange(guests.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addGuest();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-swGray800">{label}</label>
      <div className="flex gap-2">
        <div className="w-full">
          <input
            type="text"
            value={newGuest}
            onChange={(e) => setNewGuest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter guest name"
            className="w-full flex-1 h-11 px-3 py-2 border border-swGray300 rounded-lg hover:border-swPrimary500 focus:border-swPrimary500 focus:outline-none text-base font-normal text-gray-500"
          />
        </div>

        <button
          type="button"
          onClick={addGuest}
          className="px-4 py-2 bg-swPrimary500 text-white rounded-lg hover:bg-swPrimary600 focus:outline-none"
        >
          Add
        </button>
      </div>
      {guests.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {guests.map((guest, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
            >
              {guest}
              <button
                type="button"
                onClick={() => removeGuest(index)}
                className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestManager;
