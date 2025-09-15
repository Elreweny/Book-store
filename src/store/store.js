// src/store/store.js
import { create } from "zustand";
import { booksAPI, cartAPI, wishlistAPI } from "../services/apiService";
import toast from "react-hot-toast";

const useStore = create((set, get) => ({
  // 🔹 Auth
  token: sessionStorage.getItem("token") || null,
  isLoggedIn: !!sessionStorage.getItem("token"),

  setToken: (token) => {
    if (token) {
      sessionStorage.setItem("token", token);
      set({ token, isLoggedIn: true });
      // ✅ no toast here
    } else {
      sessionStorage.removeItem("token");
      set({ token: null, isLoggedIn: false });
      // ✅ no toast here
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null, isLoggedIn: false });
    // ✅ no toast here
  },

  // 🔹 Products
  books: [],
  currentBook: null,
  loading: false,
  error: null,

  // 🔹 Cart
  cart: [],
  cartCount: 0,

  // 🔹 Wishlist
  wishlist: [],
  wishlistCount: 0,

  // 🔹 Fetch single product
  fetchBook: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await booksAPI.getById(id);
      set({ currentBook: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error loading product",
        loading: false,
      });
      toast.error("Failed to load product ❌");
    }
  },

  // 🔹 Fetch products
  fetchBooks: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await booksAPI.getAll(params);
      set({ books: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error loading products",
        loading: false,
      });
      toast.error("Failed to load products ❌");
    }
  },

  // 🔹 Cart functions
  fetchCart: async () => {
    try {
      const response = await cartAPI.getAll();
      const items = response.data.data;

      const totalCount = items.reduce(
        (sum, item) => sum + Number(item.qty ?? 1),
        0
      );

      set({
        cart: items,
        cartCount: totalCount,
      });
    } catch {
      toast.error("Failed to load cart ❌");
    }
  },

  addToCart: async (bookId) => {
    try {
      await cartAPI.add(bookId);
      await get().fetchCart();
      toast.success("Product added to cart 🛒");
    } catch {
      toast.error("Failed to add product ❌");
    }
  },

  updateCartItem: async (itemId, qty) => {
    try {
      await cartAPI.update(itemId, qty);
      await get().fetchCart();
      toast.success("Quantity updated ✏️");
    } catch {
      toast.error("Failed to update quantity ❌");
    }
  },

  removeFromCart: async (itemId) => {
    try {
      await cartAPI.remove(itemId);
      await get().fetchCart();
      toast.success("Product removed from cart 🗑️");
    } catch {
      toast.error("Failed to remove product ❌");
    }
  },

  // 🔹 Wishlist functions
  fetchWishlist: async () => {
    try {
      const response = await wishlistAPI.get();
      const countResponse = await wishlistAPI.count();
      set({
        wishlist: response.data.data,
        wishlistCount: countResponse.data.count,
      });
    } catch {
      toast.error("Failed to load wishlist ❌");
    }
  },

  addToWishlist: async (bookId) => {
    try {
      await wishlistAPI.add(bookId);
      await get().fetchWishlist();
      toast.success("Product added to wishlist ❤️");
    } catch {
      toast.error("Failed to add product to wishlist ❌");
    }
  },

  removeFromWishlist: async (bookId) => {
    try {
      await wishlistAPI.remove(bookId);
      await get().fetchWishlist();
      toast.success("Product removed from wishlist 💔");
    } catch {
      toast.error("Failed to remove product from wishlist ❌");
    }
  },
}));

export default useStore;
