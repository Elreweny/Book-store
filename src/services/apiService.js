import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta?.env?.VITE_API_URL || "https://api.codingarabic.online/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let lastErrorMessage = "";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const method = error?.config?.method?.toUpperCase();
    const url = error?.config?.url;

    let message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";

    if (message.includes("Attempt to read property")) {
      const isUserAction = method !== "GET";

      if (isUserAction) {
        message = "Login to unlock your best shopping journey 🛒";
      } else {
        lastErrorMessage = "";
        return Promise.reject(error);
      }
    }

    if (status === 401) {
      message = "Login to unlock your best shopping journey 🛒";

      const isPassiveRequest =
        method === "GET" &&
        (url?.includes("/cart") ||
          url?.includes("/wishlist/get") ||
          url?.includes("/user"));

      if (isPassiveRequest) {
        if (message === lastErrorMessage) {
          return Promise.reject(error);
        }
        lastErrorMessage = message;
      }
    }

    toast.error(message);

    if (method !== "GET") {
      lastErrorMessage = "";
    }

    return Promise.reject(error);
  }
);

// Books API
export const booksAPI = {
  getAll: (params = {}) => api.get("/books", { params }),
  getById: (id) => api.get(`/books/${id}`),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getUser: () => api.get("/user"),
};

// Wishlist API
export const wishlistAPI = {
  add: (product) =>
    api.post("/wishlist/add", {
      bookId: product.book?.id ?? product.id,
      title: product.title ?? product.book?.title ?? "No title",
      image: product.image ?? product.book?.image ?? "/placeholder.png",
      price:
        Number(
          (product.price ?? product.book?.price)
            ?.toString()
            .replace(/[^\d.]/g, "")
        ) || 0,
    }),
  get: () => api.get("/wishlist/get"),
  count: () => api.get("/wishlist/count"),
  remove: (wishlistItemId) =>
    api.post("/wishlist/remove", { wishlistId: wishlistItemId }),
  clear: () => api.post("/wishlist/clear"),
};

// Cart API
export const cartAPI = {
  add: (product) =>
    api
      .post("/cart", {
        bookId: product.book?.id ?? product.id,
        title: product.title ?? product.book?.title ?? "No title",
        image: product.image ?? product.book?.image ?? "/placeholder.png",
        price:
          Number(
            (product.price ?? product.book?.price)
              ?.toString()
              .replace(/[^\d.]/g, "")
          ) || 0,
        qty: product.qty || 1,
      })
      .then((res) => res.data.data),

  getAll: () => api.get("/cart"),
  update: (itemId, qty) => api.post(`/cart/${itemId}`, { qty }),
  remove: (itemId) => api.delete(`/cart/${itemId}`),
  clear: () => api.delete("/cart/clear"),
};

export default api;
