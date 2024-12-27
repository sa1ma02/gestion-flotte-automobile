import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";


const Homepage = () => {

  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />      
    </div>
  );
};

export default Homepage;
