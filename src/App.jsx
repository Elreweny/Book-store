import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 👈 استدعاء Toaster
import "./App.css";
import router from "./Routes/Routes";

function App() {
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
