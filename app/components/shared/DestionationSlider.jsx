// components/DestinationSliders.js
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import { useState, useEffect } from "react"
import MyCarousel  from "./Carousel";

const DestinationSliders = () => {
  useEffect(() => {
    // Ensure code runs only in the browser environment
    if (typeof window !== 'undefined') {
      // Place your client-side code here
    }
  }, []);

  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/Destination.png" caption="San fransisco" title= "California"/>
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/Destination2.png" caption="ABIJAN"  title= "Côte d’Ivoire" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/Destination4.png" caption="Your caption text here"  title= "title"/>
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/Destination4.png" caption="Your caption text here"  title= "title" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/Destination.png" caption="Your caption text here"  title= "title"/>
      )
    }
  ];

  return (
    <div className="">
      <MyCarousel
        cards={cards}
        height="300px"
        width="60%"
        margin="0 auto"
        offset={2}
        showArrows={false}
      />
    </div>
  );
}

export default DestinationSliders;
