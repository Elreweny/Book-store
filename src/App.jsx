import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./Routes/Routes";
import { useEffect } from "react";
import useStore from "./store/store";

function App() {
  const fetchCart = useStore((state) => state.fetchCart);
  const fetchWishlist = useStore((state) => state.fetchWishlist);
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchCart();
      fetchWishlist();
    }
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#d1fae5",
            color: "#047857",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #6EE7B7",
          },
        }}
      />
    </>
  );
}

export default App;
