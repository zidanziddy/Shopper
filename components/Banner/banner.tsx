"use client";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  bannerImg,
  sliderImgOne,
  sliderImgTwo,
  sliderImgThree,
  sliderImgFour,
  sliderImgFive,
} from "../../public/assets /images/index"; // ✅ Fixed import path
import Image from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="flex items-center justify-center p-5 h-full">
      <div className="container flex flex-col lg:flex-row justify-around items-stretch">

        {/* ✅ Mobile & Tablet: Show Only Carousel with Size Constraints */}
        <div className="w-full max-w-[600px] max-h-[400px] rounded-lg shadow-md m-3 p-5 lg:hidden">
          <Slider {...settings}>
            <div><Image src={sliderImgOne} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgTwo} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgThree} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgFour} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgFive} alt="image" priority className="w-full h-full object-cover" /></div>
          </Slider>
        </div>

        {/* ✅ Desktop View: Full Layout (Carousel + Product) */}
        <div className="hidden lg:flex w-2/3 max-w-[700px] max-h-[450px] rounded-lg shadow-md m-3 p-5">
          <Slider {...settings}>
            <div><Image src={sliderImgOne} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgTwo} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgThree} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgFour} alt="image" priority className="w-full h-full object-cover" /></div>
            <div><Image src={sliderImgFive} alt="image" priority className="w-full h-full object-cover" /></div>
          </Slider>
        </div>

        {/* ✅ Product Section (Only on Desktop) */}
        <div className="hidden lg:flex w-1/3 max-w-[350px] rounded-lg border h-full p-4 flex-col justify-between shadow-md m-3">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Flash Pick of the Day</h2>
            <p className="hover:underline text-2xl">View All</p>
          </div>
          <div className="h-3/5">
            <Image src={bannerImg} alt="image" className="w-full h-full object-cover" />
          </div>
          <div>
            <button className="border-2 rounded-3xl text-amber-50 bg-blue-500 p-3 hover:bg-blue-800">
              Options
            </button>
            <h2 className="font-semibold">From $199</h2>
            <p>HomePro TV Stand Cabinet for Living Room...</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
