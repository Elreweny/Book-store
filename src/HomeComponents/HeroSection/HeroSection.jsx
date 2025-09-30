import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../App.css";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const slides = [
    {
      img: "https://susan-demo.myshopify.com/cdn/shop/files/Home-2-Slider-1.jpg?v=1613600608",
      position: "left",
      title: "NEW ARRIVALS",
      subtitle: "LED DESK BRAND",
      description:
        "Next generation LED lamp. A multi-function LED lamp that is environmentally friendly and gentle on the eyes.",
    },
    {
      img: "https://susan-demo.myshopify.com/cdn/shop/files/Home-1-Slider-1_ce47d5d1-7ef1-4bbc-bd67-035e6e146e60.png?v=1613600608",
      position: "center",
      title: "NEW ARRIVALS",
      subtitle: "SUPER DESK LAMP",
      description:
        "Next generation LED lamp. A multi-function LED lamp that is environmentally friendly and soft on the eyes.",
    },
    {
      img: "https://susan-demo.myshopify.com/cdn/shop/files/Home-1-Slider-3_e3ee7a66-8f64-4f8e-adec-458ae0c94fee.png?v=1613600608",
      position: "right",
      title: "NEW ARRIVALS",
      subtitle: "DESK LAMP BRAND",
      description:
        "Next generation LED lamp. A multi-function LED lamp that is environmentally friendly and soft on the eyes.",
    },
  ];

  const getPositionClasses = (pos) => {
    if (pos === "left")
      return "items-center justify-start text-left lg:pl-[120px] md:pl-[60px] sm:pl-[30px] pl-4";
    if (pos === "center") return "items-center justify-center text-center px-4";
    if (pos === "right")
      return "items-center justify-end text-right lg:pr-[120px] md:pr-[60px] sm:pr-[300px] pr-4";
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1350px] mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full relative aspect-[27/11] overflow-hidden">
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-0 left-0 w-full h-full flex ${getPositionClasses(
                    slide.position
                  )}`}
                >
                  <div className="text-black my-auto space-y-4 animate-fade-in-up px-4 sm:px-6 md:px-12 lg:px-0 w-full max-w-full">
                    <p className="uppercase text-[12px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-medium leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[34px] mb-0 sm:mb-3 md:mb-4 lg:mb-5">
                      {slide.title}
                    </p>
                    <p
                      className="text-[20px] sm:text-[32px] md:text-[40px] lg:text-[70px] 
                                 font-bold leading-[24px] sm:leading-[38px] md:leading-[45px] lg:leading-[70px] 
                                 uppercase mb-0 sm:mb-4"
                    >
                      {slide.subtitle}
                    </p>

                    <p className="text-[10px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] mb-0 sm:mb-[25px] md:mb-[30px] lg:mb-[50px] max-w-full">
                      {slide.description}
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block font-semibold leading-[20px] 
                                px-[12px] sm:px-[18px] md:px-[25px] lg:px-[35px] 
                                py-[6px] sm:py-[8px] md:py-[10px] lg:py-[14px] 
                                transition duration-300 text-[#292929] border border-[#292929] 
                                rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[70px] 
                                text-[13px] sm:text-[14px] md:text-[15px] lg:text-[18px] 
                               hover:bg-black hover:text-white"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div className="absolute top-1/2 left-2 md:left-4 z-10 -translate-y-1/2 custom-prev cursor-pointer flex items-center justify-center w-[20px] h-[20px] md:w-[40px] md:h-[40px] lg:w-[70px] lg:h-[70px] bg-gray-100 text-black rounded-full hover:bg-black hover:text-white transition duration-300">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="absolute top-1/2 right-2 md:right-4 z-10 -translate-y-1/2 custom-next cursor-pointer flex items-center justify-center w-[20px] h-[20px] md:w-[40px] md:h-[40px] lg:w-[70px] lg:h-[70px] bg-gray-100 text-black rounded-full hover:bg-black hover:text-white transition duration-300">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      {/* Banner Cards Section */}

      <div className="w-full mt-8 px-4 sm:px-6 md:px-12 lg:px-0 mb-5">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <Link
            to="/shop"
            className="flex mr-0 
        w-[290px] h-[161px] 
        sm:w-[290px] sm:h-[161px] 
        md:w-[330px] md:h-[183px] 
        lg:w-[540px] lg:h-[300px] 
        mx-auto "
          >
            <img
              src="https://susan-demo.myshopify.com/cdn/shop/files/Banner-1.png?v=1613600610"
              alt="Banner 1"
              className="w-full h-full object-cover rounded-lg shadow-md hover:scale-[1.02] transition duration-300"
            />
          </Link>

          {/* Banner 2 */}
          <Link
            to="/shop"
            className="flex ml-0  
        w-[290px] h-[161px] 
        sm:w-[290px] sm:h-[161px] 
        md:w-[330px] md:h-[183px] 
        lg:w-[540px] lg:h-[300px] 
        mx-auto"
          >
            <img
              src="https://susan-demo.myshopify.com/cdn/shop/files/Banner-2.png?v=1613600610"
              alt="Banner 2"
              className="w-full h-full object-cover rounded-lg shadow-md hover:scale-[1.02] transition duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
