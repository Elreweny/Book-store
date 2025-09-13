import { Link } from "react-router-dom";
import { FaAnglesUp } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] ">
      <div
        className="max-w-screen-xl mx-auto 
        px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[100px] 
        grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 text-sm text-gray-700"
      >
        {/* Logo + Description */}
        <div className="col-span-1">
          <div className="logo mb-4">
            <Link to="/" className="flex items-center">
              <div className="logo-img w-[151px] h-[35px]">
                <img
                  src="https://susan-demo.myshopify.com/cdn/shop/files/Logo_057b3bc4-c82c-4a1d-8aec-fc99c1e4b647_100x@2x.png?v=1613600725"
                  alt="logo"
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          </div>
          <p className="mb-4 leading-relaxed">
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            <br />
            molestie consequat, vel illum dolore eu feugiat nulla facilisis.
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address :</span> No. 96, Jecica
            City, NJ 07305, New York, USA
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone :</span> +1 222 3333 578
          </p>
          <p>
            <span className="font-semibold">Email :</span> support@example.com
          </p>
        </div>

        {/* التلت أعمدة */}
        <div className="col-span-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Business Hours */}
          <div>
            <h3 className="font-bold text-base mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li>Mon - Fri: 8AM - 10PM</li>
              <li>Sat: 9AM - 8PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>

          {/* Footer Menu */}
          <div>
            <h3 className="font-bold text-base mb-4">Footer Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#00bfc5]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#00bfc5]">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#00bfc5]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#00bfc5]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#00bfc5]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Extras Menu */}
          <div>
            <h3 className="font-bold text-base mb-4">Extras Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-[#00bfc5]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/office" className="hover:text-[#00bfc5]">
                  Our Office
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-[#00bfc5]">
                  Delivery
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-[#00bfc5]">
                  Our Store
                </Link>
              </li>
              <li>
                <Link to="/guarantee" className="hover:text-[#00bfc5]">
                  Guarantee
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 text-[16px]           
                     sm:p-3.5 sm:text-[18px] 
                     md:p-4 md:text-[20px]    
                     border-2 border-gray-200 
                    hover:border-[#00bfc5] bg-white shadow 
                    hover:text-[#00bfc5] font-light "
          aria-label="Back to top"
        >
          <FaAnglesUp />
        </button>
      </div>
    </footer>
  );
}
