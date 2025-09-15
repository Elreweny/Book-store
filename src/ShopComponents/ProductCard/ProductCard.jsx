import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import useStore from "../../store/store";

export default function ProductCard({ product }) {
  // دوال تحديث Cart و Wishlist
  const addToCartStore = useStore((state) => state.addToCart);
  const addToWishlistStore = useStore((state) => state.addToWishlist);

  // دوال handle مع try/catch + alert لتأكيد العملية
  const handleAddToCart = async () => {
  try {
    await addToCartStore(product.id);
    // ❌ شلنا alert
    // التوستر بيظهر من داخل store.js بالفعل
  } catch (err) {
    console.error("Failed to add to cart:", err);
    // ممكن تخليها toast.error هنا لو حابب
  }
};

 const handleAddToWishlist = async () => {
  try {
    await addToWishlistStore(product.id);
    // ❌ شلنا alert
  } catch (err) {
    console.error("Failed to add to wishlist:", err);
  }
  };

  return (
    <div className="border border-gray-200 shadow hover:shadow-lg transition group min-h-[477px] min-w-[285px]">
      {/* Image Wrapper */}
      <div className="relative bg-white p-12 flex items-center justify-center">
        <Link to={`/shop/${product.id}`}>
          <div className="h-[337px] w-[253px]">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        {/* Hover bar (bottom only) */}
        <div className="absolute bottom-0 w-[253px] h-[52px] bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-evenly px-4 rounded">
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-[#00bfc5]"
          >
            <FiShoppingCart size={18} />
          </button>
          <button
            onClick={handleAddToWishlist}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-[#00bfc5]"
          >
            <FiHeart size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 border-t border-gray-200">
        <p className="font-normal leading-[12px] text-[#929292] mb-2">
          {product.category}
        </p>
        <Link to={`/shop/${product.id}`}>
          <h3 className="text-[16px] leading-[18px] mb-3 font-medium hover:text-[#00bfc5]">
            {product.id}.{product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#00bfc5] text-[16px] font-bold leading-[22px]">
            {product.price}
          </span>
          
        </div>
      </div>
    </div>
  );
}
