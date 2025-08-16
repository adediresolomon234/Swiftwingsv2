"use client";

import React, { useState } from "react";
import Image from "next/image";

const FleetSpecSlider = ({ aircraft }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Extract images from the aircraft data structure
  const getAircraftImages = (aircraft) => {
    if (!aircraft) return [];
    
    // Check if aircraft has images array
    if (aircraft.images && Array.isArray(aircraft.images)) {
      return aircraft.images;
    }
    
    // Fallback to individual image_url fields if they exist
    const images = [];
    if (aircraft?.image_url) images.push(aircraft.image_url);
    if (aircraft?.image_url_2) images.push(aircraft.image_url_2);
    if (aircraft?.image_url_3) images.push(aircraft.image_url_3);
    if (aircraft?.image_url_4) images.push(aircraft.image_url_4);
    
    // If no individual URLs, use the main image
    if (images.length === 0 && aircraft?.image) {
      images.push(aircraft.image);
    }
    
    return images;
  };

  const aircraftImages = getAircraftImages(aircraft);

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    console.error(`Failed to load image ${index + 1}:`, aircraftImages[index]);
  };

  if (!aircraftImages || aircraftImages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-base">No images available for this aircraft</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Featured Image */}
      <div className="mb-4">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg bg-gray-100">
          {!imageErrors[selectedImage] ? (
            <Image
              src={aircraftImages[selectedImage]}
              alt={`${aircraft?.features?.manufacturer || 'Aircraft'} ${aircraft?.name || ''} view ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              onError={() => handleImageError(selectedImage)}
              unoptimized={true}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-3xl mb-1">🖼️</div>
                <p className="text-xs">Image failed to load</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              {selectedImage + 1} of {aircraftImages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {aircraftImages.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedImage === index 
                ? 'ring-1 ring-swPrimary500' 
                : 'hover:scale-105 hover:shadow-md'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            {!imageErrors[index] ? (
              <Image
                src={image}
                alt={`${aircraft?.features?.manufacturer || 'Aircraft'} ${aircraft?.name || ''} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                onError={() => handleImageError(index)}
                unoptimized={true}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-xs bg-gray-100">
                <div className="text-center">
                  <div className="text-lg mb-1">🖼️</div>
                  <p className="text-xs">Failed</p>
                </div>
              </div>
            )}
            
            {/* Selection indicator */}
            {selectedImage === index && (
              <div className="absolute top-1 right-1 bg-swPrimary500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                ✓
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Instructions - Compact */}
      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">
          {aircraftImages.length} image{aircraftImages.length > 1 ? 's' : ''} • Tap/click to view
        </p>
      </div>
    </div>
  );
};

export default FleetSpecSlider;
