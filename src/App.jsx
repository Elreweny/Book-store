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
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "15px",
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
}

export default App;
