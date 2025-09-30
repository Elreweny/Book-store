import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../App.css";

export default function TestimonialSection() {
  const testimonials = [
    {
      image:
        "https://susan-demo.myshopify.com/cdn/shop/files/team-01_small.jpg?v=1613600618",
      text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula. Duis feugiat quam non justo faucibus, in gravida diam tempor. Nam viverra enim non ipsum ornare, condimentum blandit diam mattis. Maecenas gravida mol..",
      author: "Bangis Cooper",
    },
    {
      image:
        "https://susan-demo.myshopify.com/cdn/shop/files/team-03_small.jpg?v=1613600618",
      text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula. Duis feugiat quam non justo faucibus, in gravida diam tempor. Nam viverra enim non ipsum ornare, condimentum blandit diam mattis. Maecenas gravida mol..",
      author: "Nidess Cooper",
    },
    {
      image:
        "https://susan-demo.myshopify.com/cdn/shop/files/team-04_small.jpg?v=1613600618",
      text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula. Duis feugiat quam non justo faucibus, in gravida diam tempor. Nam viverra enim non ipsum ornare, condimentum blandit diam mattis. Maecenas gravida mol..",
      author: "Bregory Cooper",
    },
  ];

  const quoteIcon =
    "https://susan-demo.myshopify.com/cdn/shop/t/10/assets/icon_testimonials.png?v=42267487431120279701643868379";

  return (
    <section
      className="w-full py-12 sm:py-16 bg-center bg-cover mt-4"
      style={{
        backgroundImage:
          "url('https://susan-demo.myshopify.com/cdn/shop/files/Testimonial-BG.png?v=1613600610')",
      }}
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-12 text-center">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                {/* صورة الشخص */}
                <div className="w-[70px] h-[80px] sm:w-[85px] sm:h-[100px] mb-[20px] sm:mb-[40px] overflow-hidden rounded-md">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* النص */}
                <p
                  className="leading-[22px] sm:leading-[26px] md:leading-[30px] 
                             font-lato font-normal text-[13px] sm:text-[14px] md:text-[15px] 
                             not-italic text-[#707070] w-full max-w-[90%] sm:max-w-[600px] md:max-w-[690px] mx-auto"
                >
                  {item.text}
                </p>

                {/* أيقونة الاقتباس */}
                <img
                  src={quoteIcon}
                  alt="Quote Icon"
                  className="w-[20px] h-[16px] sm:w-[29px] sm:h-[22px] mb-[15px] sm:mb-[25px]"
                />

                {/* اسم الشخص */}
                <p className="text-[14px] sm:text-[16px] font-semibold uppercase text-[#292929]">
                  {item.author}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
