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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 404) return Promise.reject(error);
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "حدث خطأ غير متوقع";
    toast.error(message);
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
      title: product.title,
      price: product.price,
      image: product.image,
    }),
  get: () => api.get("/wishlist/get"),
  count: () => api.get("/wishlist/count"),
  remove: (wishlistItemId) =>
    api.post("/wishlist/remove", { wishlistId: wishlistItemId }),
};

// Cart API
export const cartAPI = {
  add: (bookId) => api.post("/cart", { bookId }).then((res) => res.data.data),
  getAll: () => api.get("/cart"),
  update: (itemId, qty) => api.post(`/cart/${itemId}`, { qty }),
  remove: (itemId) => api.delete(`/cart/${itemId}`),
};

export default api;
