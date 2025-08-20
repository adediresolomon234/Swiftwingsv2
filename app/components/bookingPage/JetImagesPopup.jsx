import React from "react";
import Image from "next/image";

const JetImagesPopup = ({ name, images = [], open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 px-3">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {name} Images
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.length > 0 ? (
            images.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-48 relative rounded overflow-hidden border"
              >
                <Image
                  src={img}
                  alt={`Aircraft ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">
              No images available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JetImagesPopup;
