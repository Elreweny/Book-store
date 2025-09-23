import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { RxCross1 } from "react-icons/rx";

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);

  return (
    <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Wishlist 💖</h1>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const productId =
              item.productId ?? item.id ?? item.book_id ?? item.book?.id;

            return (
              <div
                key={productId}
                className="border border-gray-200 rounded-md shadow hover:shadow-lg transition relative group bg-white"
              >
                <Link to={`/shop/${productId}`}>
                  <div className="p-4 flex flex-col items-center">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      className="h-40 object-contain mb-4"
                    />
                    <h3 className="text-center font-medium text-[15px] hover:text-[#00bfc5] line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[#00bfc5] font-bold mt-2">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </Link>

                <button
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full transition duration-200"
                  onClick={() => removeFromWishlist(productId)}
                >
                  <RxCross1 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
