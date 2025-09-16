import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AuthRedirect from "../Components/AuthRedirect/AuthRedirect";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import Checkouts from "../Pages/Checkouts/Checkouts";
import Wishlist from "../Pages/Wishlist/Wishlist";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },

      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: (
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthRedirect>
            <Register />
          </AuthRedirect>
        ),
      },
      {
        path: "/shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkouts />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);
export default router;
