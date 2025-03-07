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
} from "../../public/assets /images/index"; // Remove space in path
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
        {/* Mobile & Tablet Carousel */}
        <div className="w-full max-w-[600px] h-[300px] sm:h-[400px] rounded-lg shadow-md m-3 lg:hidden relative">
          <Slider {...settings}>
            {[sliderImgOne, sliderImgTwo, sliderImgThree, sliderImgFour, sliderImgFive].map(
              (img, index) => (
                <div key={index} className="relative h-[300px] sm:h-[400px]">
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 600px"
                  />
                </div>
              )
            )}
          </Slider>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full max-w-[1200px] gap-4">
          {/* Desktop Carousel */}
          <div className="flex-1 max-w-[800px] h-[450px] rounded-lg shadow-md overflow-hidden">
            <Slider {...settings}>
              {[sliderImgOne, sliderImgTwo, sliderImgThree, sliderImgFour, sliderImgFive].map(
                (img, index) => (
                  <div key={index} className="relative h-[450px]">
                    <Image
                      src={img}
                      alt={`Slide ${index + 1}`}
                      fill
                      priority
                      className="object-cover"
                      sizes="800px"
                    />
                  </div>
                )
              )}
            </Slider>
          </div>

          {/* Product Section */}
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
      
      

      {/* Add global CSS fixes */}
      <style jsx global>{`
        .slick-list, .slick-track, .slick-slide > div {
          height: 100% !important;
        }
        .slick-slide img {
          display: block !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;