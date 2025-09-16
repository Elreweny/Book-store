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
    } else {
      sessionStorage.removeItem("token");
      set({ token: null, isLoggedIn: false });
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null, isLoggedIn: false });
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
    if (!id) return;
    set({ loading: true, error: null });
    try {
      const response = await booksAPI.getById(id);
      set({ currentBook: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error loading product",
        loading: false,
      });
      toast.error(error.response?.data?.message || "Failed to load product ❌");
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
      toast.error(error.response?.data?.message || "Failed to load products ❌");
    }
  },

  // 🔹 Cart functions
  fetchCart: async () => {
    try {
      const response = await cartAPI.getAll();
      const items = response.data.data || [];

      const totalCount = items.reduce(
        (sum, item) => sum + Number(item.qty ?? 1),
        0
      );

      set({
        cart: items,
        cartCount: totalCount,
      });
    } catch (error) {
      // مفيش توست هنا، نخلي السيرفر هو اللي يرد
      set({ cart: [], cartCount: 0 });
    }
  },

  addToCart: async (bookId) => {
    if (!bookId) return;
    try {
      await cartAPI.add(bookId);
      await get().fetchCart();
      toast.success("Product added to cart 🛒");
    } catch (error) {
     
    }
  },

  updateCartItem: async (itemId, qty) => {
    if (!itemId) return;
    try {
      await cartAPI.update(itemId, qty);
      await get().fetchCart();
      toast.success("Quantity updated ✏️");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update quantity ❌"
      );
    }
  },

  removeFromCart: async (itemId) => {
    if (!itemId) return;
    try {
      await cartAPI.remove(itemId);
      await get().fetchCart();
      toast.success("Product removed from cart 🗑️");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove product ❌"
      );
    }
  },

  // 🔹 Wishlist functions
  fetchWishlist: async () => {
    try {
      const response = await wishlistAPI.get();
      const items = response.data.data || [];
      const count = response.data.count ?? items.length;
      set({
        wishlist: items,
        wishlistCount: count,
      });
    } catch (error) {
      set({ wishlist: [], wishlistCount: 0 });
      // نخلي السيرفر يدي الرسالة لو موجودة
    }
  },

  addToWishlist: async (bookId) => {
    if (!bookId) return;
    try {
      await wishlistAPI.add(bookId);
      await get().fetchWishlist();
      toast.success("Product added to wishlist ❤️");
    } catch (error) {
     
    }
  },

  removeFromWishlist: async (bookId) => {
    if (!bookId) return;
    try {
      await wishlistAPI.remove(bookId);
      await get().fetchWishlist();
      toast.success("Product removed from wishlist 💔");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product from wishlist ❌"
      );
    }
  },
}));

export default useStore;
