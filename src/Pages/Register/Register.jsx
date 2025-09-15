// src/Pages/Register/Register.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../store/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IntroSection from "../../Components/IntroSection/IntroSection";

const API_URL = "https://api.codingarabic.online/api/";

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        name: `${values.firstname} ${values.lastname}`,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };

      const response = await axios.post(`${API_URL}auth/register`, payload, {
        headers: { Accept: "application/json" },
      });

      // 🔹 التحقق من التوكن
      const token = response.data?.data?.token;
      if (token) {
        setToken(token); // تخزين التوكن
        navigate("/");   // التوجيه للصفحة الرئيسية
      } else {
        console.error("No token returned from API");
        alert("Registration succeeded but no token was returned!");
      }
    } catch (error) {
      // 🔹 معالجة الأخطاء القادمة من السيرفر
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Registration failed";
      console.error(message);
      alert(
        typeof message === "string"
          ? message
          : JSON.stringify(message, null, 2)
      );
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
            Register
          </h2>
          <p className="text-[#666] text-[15px] text-center mb-6">
            Create your account below.
          </p>
          <div className="bg-white p-6 sm:p-8 md:p-10 shadow-[0_5px_4px_#0000001a] rounded-md">
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

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
                      autoComplete="new-password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      autoComplete="new-password"
                    />
                    <ErrorMessage
                      name="password_confirmation"
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
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </div>

                  <div className="text-sm mt-4 text-center">
                    <Link to="/login" className="text-gray-700 hover:underline">
                      Already have an account? Login
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
