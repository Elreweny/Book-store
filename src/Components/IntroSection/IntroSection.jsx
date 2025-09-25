import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function IntroSection() {
  const location = useLocation();
  const path = location.pathname.split("/")[1] || "";

  const titles = {
    about: "About Us",
    contact: "Contact Us",
    blog: "News",
    shop: "Products",
    login:"Account",
    register:"Create Account",
    wishlist:"Your Wishlist",
    cart:"Your Shopping Cart"
  };
  const pageTitle = titles[path] || "Page";

  return (
    <div className="bg-[url('./imgs/bread.jpg')] w-full 
      h-[180px] sm:h-[220px] md:h-[276px] 
      bg-cover bg-center 
      px-4 sm:px-8 md:px-[90px] 
      flex flex-col items-center justify-center">
      <h1 className="text-[20px] sm:text-[28px] md:text-[36px] font-[500] mb-2 md:mb-[15px]">
        {pageTitle}
      </h1>
      <div className="flex items-center text-[12px] sm:text-[14px] md:text-[16px]">
        <Link to="/" className="hover:text-[#00bfc5] flex items-center">
          Home <FaChevronRight className="text-[10px] ml-[3px]" />
        </Link>
        <span className="text-[#00bfc5] ml-1">{pageTitle}</span>
      </div>
    </div>
  );
}
