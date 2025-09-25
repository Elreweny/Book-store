import { Link } from "react-router-dom";
import useStore from "../../store/store";
import IntroSection from "../../Components/IntroSection/IntroSection";
import { toast } from "react-hot-toast";

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const clearWishlist = useStore((state) => state.clearWishlist);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = async (item) => {
    const preparedItem = {
      book: item.book || {},
      id: item.productId ?? item.id ?? item.book_id ?? item.book?.id,
      title: item.title ?? item.book?.title ?? "No title",
      image: item.image ?? item.book?.image ?? "/placeholder.png",
      price:
        Number(
          (item.price ?? item.book?.price)?.toString().replace(/[^\d.]/g, "")
        ) || 0,
    };

    try {
      await addToCart(preparedItem);
      toast.success("Product added to cart 🛒");
    } catch {
      toast.error("Failed to add to cart ❌");
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      toast.success("Removed from wishlist 💔");
    } catch {
      toast.error("Failed to remove from wishlist ❌");
    }
  };

  const handleClearWishlist = () => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          <span>Are you sure you want to clear your wishlist?</span>
          <div className="flex gap-3 justify-end mt-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await clearWishlist();
                  toast.success("Wishlist cleared 🧹");
                } catch {
                  toast.error("Failed to clear wishlist ❌");
                }
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  return (
    <>
      <IntroSection />
      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-10">
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">Your wishlist is empty.</p>
            <Link
              to="/shop"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
              {wishlist.map((item) => {
                const productId =
                  item.productId ?? item.id ?? item.book_id ?? item.book?.id;
                const title = item.title ?? item.book?.title ?? "No title";
                const image =
                  item.image ?? item.book?.image ?? "/placeholder.png";
                const rawPrice = item.price ?? item.book?.price ?? "0";
                const price = Number(
                  rawPrice.toString().replace(/[^\d.]/g, "")
                );

                return (
                  <div
                    key={productId}
                    className="border border-gray-200 rounded-md shadow hover:shadow-lg transition bg-white flex flex-col lg:flex-row"
                  >
                    <Link
                      to={`/shop/${productId}`}
                      className="w-full lg:w-1/2 p-4 flex justify-center items-center"
                    >
                      <img
                        src={image}
                        alt={title}
                        className="h-40 object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    </Link>

                    <div className="w-full lg:w-1/2 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {title}
                        </h3>
                        <p className="text-[#00bfc5] font-bold mt-1">
                          ${price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2 overflow-hidden text-ellipsis">
                          {item.description || "No description available."}
                        </p>

                        <table className="w-full text-sm mt-4">
                          <tbody>
                            <tr className="border border-gray-200">
                              <td className="py-2 font-semibold text-gray-700">
                                Product ID
                              </td>
                              <td className="py-2 text-gray-900">
                                {productId}
                              </td>
                            </tr>
                            <tr className="border border-gray-200">
                              <td className="py-2 font-semibold text-gray-700">
                                Category
                              </td>
                              <td className="py-2 text-gray-900">
                                {item.category || "N/A"}
                              </td>
                            </tr>
                            <tr className="border border-gray-200">
                              <td className="py-2 font-semibold text-gray-700">
                                Publish Date
                              </td>
                              <td className="py-2 text-gray-900">
                                {item.published_date || "N/A"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="flex gap-3 mt-6 flex-wrap">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-white text-[#00bfc5] border border-[#00bfc5] px-5 py-2 rounded-md text-sm hover:text-black hover:border-black transition-colors"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => handleRemove(productId)}
                          className="bg-red-100 text-red-600 px-5 py-2 rounded-md text-sm hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <button
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-200"
                onClick={handleClearWishlist}
              >
                Clear Wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
