import useStore from "../../store/store";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import IntroSection from "../../Components/IntroSection/IntroSection";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateCartItem = useStore((state) => state.updateCartItem);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const subtotal = cart.reduce((sum, item) => {
    const rawPrice = item.price ?? item.book?.price ?? "0";
    const price = Number(rawPrice.toString().replace(/[^\d.]/g, ""));
    const qty = Number(item.qty) || 0;
    return sum + price * qty;
  }, 0);

  const handleClearCart = () => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          <span>Are you sure you want to clear your cart?</span>
          <div className="flex gap-3 justify-end">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await clearCart();
                  toast.success("Cart cleared 🧹");
                } catch {
                  toast.error("Failed to clear cart ❌");
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
      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem]">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto rounded-md">
            <table className="w-full text-center border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-300 text-center">
                    Image
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Product
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Price
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Quantity
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Total
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const productId =
                    item.productId ?? item.id ?? item.book_id ?? item.book?.id;
                  const title = item.title ?? item.book?.title ?? "No title";
                  const image =
                    item.image ?? item.book?.image ?? "/placeholder.png";
                  const rawPrice = item.price ?? item.book?.price ?? "0";
                  const price = Number(
                    rawPrice.toString().replace(/[^\d.]/g, "")
                  );
                  const qty = Number(item.qty) || 0;

                  return (
                    <tr key={productId}>
                      <td className="p-3 border border-gray-300 text-center">
                        <img
                          src={image}
                          alt={title}
                          className="w-16 h-20 object-contain mx-auto"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <span className="font-medium block">{title}</span>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            {item.variant}
                          </p>
                        )}
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        ${price.toFixed(2)}
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <div className="flex items-center justify-center border rounded w-fit mx-auto overflow-hidden">
                          <button
                            className="px-2 text-gray-600 hover:bg-gray-100"
                            onClick={() =>
                              updateCartItem(productId, Math.max(1, qty - 1))
                            }
                          >
                            −
                          </button>
                          <span className="px-3">{qty}</span>
                          <button
                            className="px-2 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateCartItem(productId, qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        ${(price * qty).toFixed(2)}
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full mx-auto transition duration-200"
                          onClick={() => removeFromCart(productId)}
                        >
                          <RxCross1 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {cart.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
              onClick={() => toast.success("Cart updated ✅")}
            >
              Update Cart
            </button>
            <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200">
              Continue Shopping
            </button>
            <button
              className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Get shipping estimates</h2>

            <div className="space-y-3">
              <select className="border border-gray-300 p-2 w-full rounded">
                <option>---</option>
                <option>USA</option>
                <option>UK</option>
                <option>Egypt</option>
              </select>

              <input
                type="text"
                placeholder="Zip/Postal Code"
                className="border border-gray-300 p-2 w-full rounded"
              />

              <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200">
                Calculate shipping
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Cart Totals</h2>

            <div className="border border-gray-400 rounded divide-y divide-gray-300">
              <div className="flex items-center justify-between p-4">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-gray-700">Total</span>
                <span className="font-semibold text-black">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-black text-white text-center px-6 py-3 rounded hover:bg-gray-800 transition duration-200"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
