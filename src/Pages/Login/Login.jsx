// src/Pages/Login/Login.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../store/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IntroSection from "../../Components/IntroSection/IntroSection";

const API_URL = "https://api.codingarabic.online/api/";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Too short").required("Password is required"),
});

export default function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API_URL}auth/login`, values, {
        headers: { Accept: "application/json" },
      });

      // 🔹 التأكد إن الـ response راجع فيه token
      const token = response.data?.data?.token;
      if (token) {
        setToken(token); // تخزين التوكن في Zustand + sessionStorage
        navigate("/");   // توجيه لصفحة الهوم بعد النجاح
      } else {
        console.error("No token returned from API");
      }
    } catch (error) {
      // 🔹 عرض رسالة أو تخزينها لاحقًا (ممكن نربطها بـ Zustand)
      const message = error.response?.data?.message || "Login failed";
      console.error(message);
      alert(message); // مبدئيًا: عرض رسالة خطأ بسيطة
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <IntroSection />
      <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f3f3f3] shadow-md py-8 px-4 sm:px-6 md:px-10 w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg">
          <h2 className="text-[2rem] mb-1 capitalize text-center font-medium">
            Login
          </h2>
          <p className="text-[#666] text-[15px] text-center mb-6">
            Please login using account detail below.
          </p>
          <div className="bg-white p-6 sm:p-8 md:p-10 shadow-[0_5px_4px_#0000001a] rounded-md">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      autoComplete="current-password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black text-white px-6 py-2 rounded-md w-full sm:w-auto text-center"
                    >
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                    <p className="text-sm text-gray-500 text-center sm:text-right cursor-pointer hover:underline">
                      Forgot your password?
                    </p>
                  </div>

                  <div className="text-sm mt-4 text-center">
                    <Link to="/register" className="text-gray-700 hover:underline">
                      Create account
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
