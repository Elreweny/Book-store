// src/Components/Header/Header.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";
import { VscMenu } from "react-icons/vsc";
import { FiHeart } from "react-icons/fi";

import { FiX, FiChevronDown, FiSearch } from "react-icons/fi";
import useStore from "../../store/store";

export default function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // ✅ Zustand values
  const token = useStore((state) => state.token);
  const logout = useStore((state) => state.logout);
  const cartCount = useStore((state) => state.cartCount);
  const wishlistCount = useStore((state) => state.wishlistCount); // ✅ جديد
  const fetchCart = useStore((state) => state.fetchCart);
  const fetchWishlist = useStore((state) => state.fetchWishlist); // ✅ جديد

  const isLoggedIn = !!token;
  const navigate = useNavigate();

  // ✅ sync cart + wishlist on refresh
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
      fetchWishlist();
    }
  }, [isLoggedIn, fetchCart, fetchWishlist]);

  // ✅ handle window resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setOpenSidebar(false);
    navigate("/"); // redirect after logout
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem]">
          {/* Logo + Links */}
          <div className="flex items-center">
            <div className="logo mr-[40px] md:mr-[60px] lg:mr-[120px]">
              <Link to="/" className="flex items-center">
                <div className="logo-img w-[100px] h-[23px]">
                  <img
                    src="https://susan-demo.myshopify.com/cdn/shop/files/Logo_057b3bc4-c82c-4a1d-8aec-fc99c1e4b647_100x@2x.png?v=1613600725"
                    alt="logo"
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>
            </div>

            {/* Links (desktop only) */}
            <div className="nav-links">
              <ul className="hidden md:flex space-x-[30px] lg:space-x-[60px] font-medium">
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#00bfc5] font-semibold leading-[55px] uppercase text-[14px]"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="hover:text-[#00bfc5] font-semibold leading-[55px] uppercase text-[14px]"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-[#00bfc5] font-semibold leading-[55px] uppercase text-[14px]"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#00bfc5] font-semibold leading-[55px] uppercase text-[14px]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#00bfc5] font-semibold leading-[55px] uppercase text-[14px]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-8">
            {/* Wishlist with badge */}
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <FiHeart className="text-[18px] hover:text-[#00bfc5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00bfc5] text-white text-[12px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with badge */}
            <Link to="/cart" className="relative" aria-label="Cart">
              <SlHandbag className="text-[18px] hover:text-[#00bfc5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00bfc5] text-white text-[12px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpenSidebar(true)}
              className="p-1 border-2 border-gray-200 inline-flex items-center justify-center hover:text-[#00bfc5] transition"
              aria-label="Open menu"
            >
              <VscMenu className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          openSidebar ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Menu</h2>
            <button
              onClick={() => setOpenSidebar(false)}
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6 text-white bg-black" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Desktop Sidebar */}
          {isDesktop ? (
            <>
              <div>
                <h3 className="font-bold mb-2">My Account</h3>
                <ul className="space-y-2 font-medium pl-2">
                  {isLoggedIn ? (
                    <li>
                      <button onClick={handleLogout} className="cursor-pointer">
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" onClick={() => setOpenSidebar(false)}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          onClick={() => setOpenSidebar(false)}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Currency</h3>
                <ul className="space-y-2 text-gray-700 text-sm pl-2">
                  <li>USD - US Dollar</li>
                  <li>EUR - Euro</li>
                  <li>GBP - British Pound</li>
                  <li>INR - Indian Rupee</li>
                  <li>BDT - Bangladeshi Taka</li>
                  <li>JPY - Japan Yen</li>
                  <li>CAD - Canada Dollar</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Mobile Sidebar */}
              <div className="relative w-full mb-2.5">
                <input
                  type="search"
                  placeholder="Search our store"
                  className="w-full p-2 pr-10 bg-gray-200 border-0 focus:outline-none focus:border-0"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label="Search"
                >
                  <FiSearch />
                </button>
              </div>

              <ul className="space-y-4 font-medium">
                <li>
                  <Link to="/" onClick={() => setOpenSidebar(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" onClick={() => setOpenSidebar(false)}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={() => setOpenSidebar(false)}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setOpenSidebar(false)}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setOpenSidebar(false)}>
                    Contact
                  </Link>
                </li>
              </ul>

              {/* My Account Mobile */}
              <div>
                <button
                  onClick={() => setOpenAccount(!openAccount)}
                  className="flex justify-between w-full font-bold"
                  aria-expanded={openAccount}
                >
                  My Account
                  <FiChevronDown
                    className={`transition-transform ${
                      openAccount ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccount && (
                  <ul className="mt-2 space-y-2 text-gray-700 pl-4">
                    {isLoggedIn ? (
                      <li>
                        <button
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout
                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/login"
                            onClick={() => setOpenSidebar(false)}
                          >
                            Log in
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/register"
                            onClick={() => setOpenSidebar(false)}
                          >
                            Create account
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>

              {/* Currency Mobile */}
              <div>
                <button
                  onClick={() => setOpenCurrency(!openCurrency)}
                  className="flex justify-between w-full font-bold"
                  aria-expanded={openCurrency}
                >
                  USD
                  <FiChevronDown
                    className={`transition-transform ${
                      openCurrency ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openCurrency && (
                  <ul className="mt-2 space-y-2 text-gray-700 text-sm pl-4">
                    <li>USD - US Dollar</li>
                    <li>EUR - Euro</li>
                    <li>GBP - British Pound</li>
                    <li>INR - Indian Rupee</li>
                    <li>BDT - Bangladeshi Taka</li>
                    <li>JPY - Japan Yen</li>
                    <li>CAD - Canada Dollar</li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {openSidebar && (
        <button
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          aria-label="Close overlay"
        />
      )}
    </>
  );
}
