import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useStore from "../../store/store";
import axios from "axios";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { booksAPI } from "../../services/apiService";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const buyNow = searchParams.get("buyNow") === "1";
  const productId = searchParams.get("id");

  const [singleProduct, setSingleProduct] = useState(null);
  const cart = useStore((state) => state.cart ?? []);

  useEffect(() => {
    if (buyNow && productId) {
      booksAPI
        .getById(productId)
        .then((res) => setSingleProduct(res.data.data))
        .catch(() => setSingleProduct(null));
    }
  }, [buyNow, productId]);

  const cartItems =
    buyNow && singleProduct
      ? [
          {
            productId: singleProduct.id,
            title: singleProduct.title,
            image: singleProduct.image,
            price:
              Number(singleProduct.price?.toString().replace(/[^\d.]/g, "")) ||
              0,
            qty: 1,
          },
        ]
      : cart;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return sum + price * qty;
  }, 0);

  const shipping = 0.16;
  const total = subtotal + shipping;

  const initialValues = {
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    region: "",
    postalCode: "",
    useSavedAddress: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    country: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const payload = {
        contact: values.email,
        delivery: {
          country: values.country,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          apartment: values.apartment,
          city: values.city,
          region: values.region,
          postalCode: values.postalCode,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          qty: item.qty,
        })),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, payload);
      alert("Order submitted successfully!");
      actions.resetForm();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to submit order.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[1.25rem] lg:mt-[20px] grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:hidden col-span-1">
          <button
            onClick={() => setShowSummary((s) => !s)}
            className="w-full bg-gray-200 px-4 py-3 rounded flex items-center justify-between"
          >
            <span className="font-medium flex items-center gap-2">
              Order summary
              {showSummary ? <FaChevronUp /> : <FaChevronDown />}
            </span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </button>

          {showSummary && (
            <div className="border border-gray-300 rounded p-3 space-y-4 text-sm mt-4 bg-white">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              {cartItems.map((item, idx) => {
                const qty = Number(item.qty) || 1;
                const title = item.title;
                const price = Number(item.price) || 0;
                const img = item.image ?? "";
                return (
                  <div
                    key={item.productId ?? idx}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                          {img ? (
                            <img
                              src={img}
                              alt={title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}
                        </div>
                        <div className="absolute -top-2 -left-2 bg-black text-white text-[10px] w-4 h-4 rounded flex items-center justify-center">
                          {qty}
                        </div>
                      </div>
                      <div className="max-w-[140px]">
                        <div className="text-sm font-medium truncate">
                          {title}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      ${(price * qty).toFixed(2)}
                    </div>
                  </div>
                );
              })}
              <hr />
              <div className="flex justify-between font-medium">
                <span>
                  Subtotal ({cartItems.length} item
                  {cartItems.length > 1 ? "s" : ""})
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span>USD ${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 col-span-1">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
            Contact & Delivery
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-1 sm:mb-2">
                    Email or Phone
                  </label>
                  <Field
                    name="email"
                    className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs sm:text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1 sm:mb-2">
                    Country/Region
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Egypt">Egypt</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-xs sm:text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1 sm:mb-2">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                      placeholder="First name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1 sm:mb-2">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                      placeholder="Last name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1 sm:mb-2">
                    Address
                  </label>
                  <Field
                    name="address"
                    className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                    placeholder="Street address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-xs sm:text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1 sm:mb-2">
                    Apartment/Suite (optional)
                  </label>
                  <Field
                    name="apartment"
                    className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1 sm:mb-2">
                      City
                    </label>
                    <Field
                      name="city"
                      className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                      placeholder="City"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1 sm:mb-2">
                      Governorate
                    </label>
                    <Field
                      as="select"
                      name="region"
                      className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                    >
                      <option value="">Select</option>
                      <option>Governorate 1</option>
                      <option>Governorate 2</option>
                    </Field>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1 sm:mb-2">
                      Postal code (optional)
                    </label>
                    <Field
                      name="postalCode"
                      className="w-full border border-gray-200 p-2 sm:p-3 rounded-md text-sm"
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Use a saved address
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    <Field
                      type="checkbox"
                      name="useSavedAddress"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-600">
                      Use my default saved address
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    Shipping Method
                  </h3>
                  <div className="border border-gray-300 rounded p-3 sm:p-4 flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Standard Shipping
                    </span>
                    <span className="text-sm font-medium">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    Payment
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    All transactions are secure and encrypted.
                  </p>
                  <div className="border border-red-300 bg-red-50 text-red-600 p-3 sm:p-4 rounded text-sm">
                    This store can't accept payments right now.
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <button
                    type="submit"
                    disabled
                    className="w-full bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded cursor-not-allowed text-sm sm:text-base"
                  >
                    Pay Now
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>

        <aside className="hidden lg:block lg:col-span-6 col-span-1">
          <div className="sticky top-[10px]">
            <div className="bg-[#fafafa] border-l border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                {cartItems.map((item, idx) => {
                  const qty = Number(item.qty) || 1;
                  const title = item.title;
                  const price = Number(item.price) || 0;
                  const img = item.image ?? "";
                  return (
                    <div
                      key={item.productId ?? idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-md overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                            {img ? (
                              <img
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100" />
                            )}
                          </div>
                          <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded flex items-center justify-center">
                            {qty}
                          </div>
                        </div>
                        <div className="max-w-[160px]">
                          <div className="text-sm font-medium truncate">
                            {title}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(price * qty).toFixed(2)}
                      </div>
                    </div>
                  );
                })}

                <hr />

                <div className="flex justify-between font-medium">
                  <span>
                    Subtotal ({cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"})
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>USD ${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
