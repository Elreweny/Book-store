// src/services/apiService.js
import axios from "axios";
import toast from "react-hot-toast";

/**
 * Vite: المتغيرات لازم تبدأ بـ VITE_
 * fallback: https://api.codingarabic.online/api
 */
const API_BASE_URL =
  import.meta?.env?.VITE_API_URL || "https://api.codingarabic.online/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * يضيف التوكن من sessionStorage على كل طلب
 */
api.interceptors.request.use((config) => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error("Token read error:", err);
  }
  return config;
});

/**
 * Response Interceptor
 * أي خطأ من السيرفر → Toast Error
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "حدث خطأ غير متوقع";
    toast.error(message);
    return Promise.reject(error);
  }
);

/* -----------------------------
   API Endpoints
------------------------------ */

// Books API
export const booksAPI = {
  getAll: (params = {}) => api.get("/books", { params }),
  getById: (id) => api.get(`/books/${id}`),
  filter: (filters) => api.get("/books", { params: filters }),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getUser: () => api.get("/user"),
  updateUser: (userData) => api.put("/user/update", userData),
};

// Wishlist API
export const wishlistAPI = {
  add: (bookId) => api.post("/wishlist/add", { bookId }),
  get: () => api.get("/wishlist/get"),
  remove: (bookId) => api.post("/wishlist/remove", { bookId }),
};

// Cart API
export const cartAPI = {
  add: (bookId) => api.post("/cart", { bookId }),
  getAll: () => api.get("/cart"),
  remove: (itemId) => api.delete(`/cart/${itemId}`),
  update: (itemId, qty) => api.put(`/cart/${itemId}`, { qty }),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getAll: () => api.get("/orders"),
  getById: (id) => api.get(`/orders/${id}`),
};

export default api;
