import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

  const addToCart = useStore((s) => s.addToCart);
  const addToWishlist = useStore((s) => s.addToWishlist);
  const removeFromWishlist = useStore((s) => s.removeFromWishlist);
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
      await addToWishlist(product);
      setIsInWishlist(true);
      setMessage("Added to wishlist.");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      setMessage("Failed to add to wishlist.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!product) return;
    try {
      await removeFromWishlist(product.id);
      setIsInWishlist(false);
      setMessage("Removed from wishlist.");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      setMessage("Failed to remove from wishlist.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product);
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
        <div className="text-lg sm:text-xl">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg sm:text-xl text-red-600">{error}</div>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg sm:text-xl">Product not found</div>
      </div>
    );

  return (
    <>
      <IntroSection />
      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-8">
        {message && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm sm:text-base">
            {message}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-auto overflow-hidden rounded-lg hover:shadow-[0_10px_20px_rgba(0,191,197,0.5)]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="items-start mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                {product.id}. {product.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#00bfc5] ">
                {product.price}
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {product.description || "No description available."}
            </p>

            <div className="mb-6">
              <table className="w-full text-sm sm:text-base">
                <tbody>
                  <tr className="border border-gray-200">
                    <td className="py-2 font-semibold text-gray-700">
                      Book Name:
                    </td>
                    <td className="py-2 text-gray-900">
                      {product.id}. {product.title}
                    </td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="py-2 font-semibold text-gray-700">
                      Author Name
                    </td>
                    <td className="py-2 text-gray-900">
                      {product.author?.name || "Unknown"}
                    </td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="py-2 font-semibold text-gray-700">
                      Product Type
                    </td>
                    <td className="py-2 text-gray-900">{product.category}</td>
                  </tr>
                  <tr className="border border-gray-200">
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

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-700 text-sm sm:text-base">
                  Qty
                </p>
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

              <button
                className="bg-white text-[#00bfc5] border border-[#00bfc5] px-5 sm:px-6 py-2 rounded-md text-sm sm:text-base hover:text-black hover:border-black transition-colors"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>

              <div className="flex gap-2">
                <button
                  aria-pressed={isInWishlist}
                  onClick={handleAddToWishlist}
                  className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-sm sm:text-base ${
                    isInWishlist
                      ? "bg-white text-[#00bfc5]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isInWishlist ? "✔" : "♡"}
                </button>
                <button
                  onClick={handleRemoveFromWishlist}
                  className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full cursor-pointer text-sm sm:text-base"
                >
                  ✘
                </button>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/checkout"
                className="block w-3/4 text-center text-white bg-black border px-6 sm:px-7 text-base sm:text-lg py-3 rounded-md hover:bg-white hover:text-[#00bfc5] hover:border-[#00bfc5] transition-colors"
              >
                Buy it now
              </Link>
              <p className="text-gray-600 italic mt-2 text-xs sm:text-sm">
                Town blank name: nish; numbe: rdoke
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
