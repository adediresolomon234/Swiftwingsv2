"use client";

//import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
//import { config } from "react-spring";

const MyCarousel  =(props) => {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  useEffect(() => {
    // Code that depends on browser environment (e.g., window)
    // Ensure it runs only in the browser environment
    if (typeof window !== 'undefined') {
      // Place your client-side code here
    }
  }, []);
  
  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      {/* <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      /> */}
    </div>
  );
};

export default  MyCarousel ;