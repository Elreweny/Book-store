// src/Pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { booksAPI } from "../../services/apiService";
import useStore from "../../store/store";
import IntroSection from "../../Components/IntroSection/IntroSection";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [message, setMessage] = useState("");

  // store actions/state
  const addToCart = useStore((s) => s.addToCart);
  const addToWishlist = useStore((s) => s.addToWishlist);
  const wishlist = useStore((s) => s.wishlist);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await booksAPI.getById(id);
        setProduct(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // keep isInWishlist in sync with store.wishlist and loaded product
  useEffect(() => {
    if (!product) return;
    const inList =
      Array.isArray(wishlist) &&
      wishlist.some(
        (item) =>
          item?.id === product.id ||
          item?.book_id === product.id ||
          item?.book?.id === product.id
      );
    setIsInWishlist(Boolean(inList));
  }, [product, wishlist]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

 

  const handleAddToWishlist = async () => {
    if (!product) return;
    try {
      await addToWishlist(product.id);
      setIsInWishlist(true);
      setMessage("Added to wishlist.");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      setMessage("Failed to add to wishlist.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      // if your API supports qty, update addToCart to accept qty; for now call with id
      await addToCart(product.id);
      setMessage("Product added to cart.");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setMessage("Failed to add to cart.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Product not found</div>
      </div>
    );

  return (
    <>
      <IntroSection />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            HISTORY OF MOON VOL-1
          </h1>
          <h2 className="text-xl text-gray-600 mt-2">BH PRODUCTION</h2>
          <div className="border-t border-gray-300 my-6"></div>
        </div>

        {message && (
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* قسم الوسائط (الفيديو) */}
          <div className="lg:w-1/2">
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center border border-gray-300">
              <span className="text-gray-500 text-lg">ڤيديو المنتج</span>
            </div>
          </div>

          {/* قسم معلومات المنتج */}
          <div className="lg:w-1/2">
            {/* العنوان والسعر */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {product.id}. {product.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {product.price}
              </p>
            </div>

           

            {/* الوصف */}
            <p className="text-gray-600 mb-6">
              {product.description || "No description available."}
            </p>

            {/* جدول التفاصيل */}
            <div className="mb-6">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold text-gray-700">
                      Book Name:
                    </td>
                    <td className="py-2 text-gray-900">
                      {product.id}. {product.title}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold text-gray-700">
                      Author Name
                    </td>
                    <td className="py-2 text-gray-900">
                      {product.author?.name || "Unknown"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-semibold text-gray-700">
                      Product Type
                    </td>
                    <td className="py-2 text-gray-900">
                      {product.category}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">
                      Item Publish Date
                    </td>
                    <td className="py-2 text-gray-900">
                      {product.published_date || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

           

            {/* اختيار الكمية */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-semibold text-gray-700">Qty</p>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <div className="flex gap-2">
                <button
                  aria-pressed={isInWishlist}
                  onClick={handleAddToWishlist}
                  className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                    isInWishlist ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isInWishlist ? "✔" : "♡"}
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full cursor-pointer">
                  ✘
                </button>
              </div>
            </div>

            <div className="border-t border-gray-300 my-6"></div>

            {/* قسم الشراء المباشر */}
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Buy it now</h3>
              <p className="text-gray-600 italic">Town blank name: nish; numbe: rdoke</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
