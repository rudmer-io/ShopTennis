import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-blue-500 dark:from-gray-800 bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
      >
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1621586392/Banner_2_sysg8x.png"
            alt="banner"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1621576329/Banner_1_lfzwhv.png"
            alt="banner"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1621586765/Banner_3_g79koo.png"
            alt="banner"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
