import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { SlHandbag } from "react-icons/sl";
import useStore from "../../store/store";

export default function ProductCard({ product }) {
  const addToCartStore = useStore((state) => state.addToCart);
  const removeFromCartStore = useStore((state) => state.removeFromCart);
  const addToWishlistStore = useStore((state) => state.addToWishlist);
  const removeFromWishlistStore = useStore((state) => state.removeFromWishlist);

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const cartLoaded = useStore((state) => state.cartLoaded);
  const wishlistLoaded = useStore((state) => state.wishlistLoaded);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (cartLoaded && wishlistLoaded) {
      setVisible(true);
    }
  }, [cartLoaded, wishlistLoaded]);

  const productId =
    product.productId ?? product.book?.id ?? product.book_id ?? product.id;

  const matchProduct = (item) => item.productId === productId;

  const inCart = cart.some(matchProduct);
  const inWishlist = wishlist.some(matchProduct);

  const handleCartClick = async () => {
    if (inCart) {
      await removeFromCartStore(productId);
    } else {
      await addToCartStore(product);
    }
  };

  const handleWishlistClick = async () => {
    if (inWishlist) {
      await removeFromWishlistStore(productId);
    } else {
      await addToWishlistStore(product);
    }
  };

  if (!visible) return null;

  return (
    <div className="border border-gray-200 shadow hover:shadow-lg transition group w-full bg-white flex flex-col rounded-md">
      <div className="relative p-6 flex items-center justify-center">
        <Link to={`/shop/${productId}`} className="w-full">
          <div className="h-[220px] w-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[200px] w-auto object-contain mx-auto"
            />
          </div>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 h-[52px] bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-evenly px-4">
          <button
            onClick={handleCartClick}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition ${
              inCart ? "bg-[#00bfc5]" : "bg-white"
            }`}
          >
            <SlHandbag size={18} />
          </button>
          <button
            onClick={handleWishlistClick}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition ${
              inWishlist ? "bg-[#00bfc5]" : "bg-white"
            }`}
          >
            <FiHeart size={18} />
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex-1 flex flex-col justify-between">
        <div>
          <p className="font-normal text-sm text-[#929292] mb-2">
            {product.category}
          </p>
          <Link to={`/shop/${productId}`}>
            <h3 className="text-[15px] mb-2 font-medium hover:text-[#00bfc5] line-clamp-2">
              {productId}. {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#00bfc5] text-[15px] font-bold leading-[20px]">
           {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
