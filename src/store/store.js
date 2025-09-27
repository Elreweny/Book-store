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
    window.location.reload();
  },

  // 🔹 Products
  books: [],
  currentBook: null,
  loading: false,
  error: null,

  fetchBook: async (id) => {
    if (!id) return;
    set({ loading: true, error: null });
    try {
      const response = await booksAPI.getById(id);
      set({ currentBook: response.data.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error loading product",
        loading: false,
      });
    }
  },

  fetchBooks: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await booksAPI.getAll(params);
      set({ books: response.data.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error loading products",
        loading: false,
      });
    }
  },

  // 🔹 Cart
  cart: [],
  cartCount: 0,
  cartLoaded: false,

  fetchCart: async () => {
    try {
      const response = await cartAPI.getAll();
      const items = response.data.data || [];

      const mappedItems = await Promise.all(
        items.map(async (item) => {
          const bookId = item.bookId;
          let bookData = {};

          try {
            const bookResponse = await booksAPI.getById(bookId);
            bookData = bookResponse.data.data || {};
          } catch {
            bookData = {};
          }

          return {
            cartItemId: item.cartId,
            productId: bookId,
            id: bookId,
            book_id: bookId,
            book: bookData,
            title: bookData.title ?? "No title",
            image: bookData.image ?? "/placeholder.png",
            price:
              Number(item.price?.toString().replace(/[^\d.]/g, "")) ||
              Number(bookData.price?.toString().replace(/[^\d.]/g, "")) ||
              0,
            qty: Number(item.qty) || 1,
          };
        })
      );

      const totalCount = mappedItems.reduce((sum, item) => sum + item.qty, 0);
      set({ cart: mappedItems, cartCount: totalCount, cartLoaded: true });
    } catch {
      set({ cart: [], cartCount: 0, cartLoaded: true });
    }
  },

  addToCart: async (product) => {
    const productId = product.book?.id ?? product.id;
    const cart = get().cart;

    const exists = cart.some((item) => item.productId === productId);
    if (exists) return;

    const preparedProduct = {
      book: product.book || {},
      id: productId,
      title: product.title ?? product.book?.title ?? "No title",
      image: product.image ?? product.book?.image ?? "/placeholder.png",
      price:
        Number(
          (product.price ?? product.book?.price)
            ?.toString()
            .replace(/[^\d.]/g, "")
        ) || 0,
      qty: product.qty || 1, // ← هنا الإضافة المهمة
    };

    try {
      await cartAPI.add(preparedProduct);
      await get().fetchCart();
      toast.success("Product added to cart 🛒");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product ❌");
    }
  },

  removeFromCart: async (bookId) => {
    if (!bookId) return;
    const cart = get().cart;
    const targetItem = cart.find((item) => item.productId === bookId);
    if (!targetItem || !targetItem.cartItemId) return;

    try {
      await cartAPI.remove(targetItem.cartItemId);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error(
          error.response?.data?.message || "Failed to remove product ❌"
        );
      }
    }

    const removedQty = targetItem?.qty ?? 1;
    const updatedCart = cart.filter(
      (item) => item.cartItemId !== targetItem.cartItemId
    );
    set({ cart: updatedCart, cartCount: get().cartCount - removedQty });
    toast.success("Product removed from cart 🗑️");
  },

  updateCartItem: async (bookId, qty) => {
    const cart = get().cart;
    const targetItem = cart.find((item) => item.productId === bookId);
    if (!targetItem || !targetItem.cartItemId) return;

    try {
      await cartAPI.update(targetItem.cartItemId, qty);
      const updatedCart = cart.map((item) =>
        item.cartItemId === targetItem.cartItemId ? { ...item, qty } : item
      );
      const totalCount = updatedCart.reduce((sum, item) => sum + item.qty, 0);
      set({ cart: updatedCart, cartCount: totalCount });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update quantity ❌"
      );
    }
  },

  clearCart: async () => {
    const cart = get().cart;
    try {
      for (const item of cart) {
        await get().removeFromCart(item.productId);
      }
    } catch (error) {
      toast.error("Failed to clear cart ❌");
    }
  },

  // 🔹 Wishlist
  wishlist: [],
  wishlistCount: 0,
  wishlistLoaded: false,

  fetchWishlist: async () => {
    try {
      const response = await wishlistAPI.get();
      const items = response.data.data || [];

      const mappedItems = items.map((item) => {
        const book = item.book || {};
        const bookId = book.id ?? item.book_id;

        return {
          wishlistId: item.id,
          productId: bookId,
          id: bookId,
          book_id: bookId,
          book: book,
          title: book.title ?? item.title ?? "No title",
          image: book.image ?? item.image ?? "/placeholder.png",
          price:
            Number(
              (item.price ?? book.price)?.toString().replace(/[^\d.]/g, "")
            ) || 0,
          description: book.description ?? item.description ?? "",
          category: book.category ?? item.category ?? "",
          author: book.author ?? item.author ?? {},
          published_date: book.published_date ?? item.published_date ?? "",
        };
      });

      set({
        wishlist: mappedItems,
        wishlistCount: mappedItems.length,
        wishlistLoaded: true,
      });
    } catch {
      set({ wishlist: [], wishlistCount: 0, wishlistLoaded: true });
    }
  },

  addToWishlist: async (product) => {
    const wishlist = get().wishlist;
    const productId = product.book?.id ?? product.id;

    const alreadyInWishlist = wishlist.some(
      (item) => item.productId === productId
    );
    if (alreadyInWishlist) return;

    try {
      await wishlistAPI.add(product);
      const updatedWishlist = [
        ...wishlist,
        {
          productId,
          id: productId,
          book_id: productId,
          title: product.title,
          image: product.image,
          price: Number(product.price?.toString().replace(/[^\d.]/g, "")) || 0,
          description: product.description || "",
          category: product.category || "",
          author: product.author || {},
          published_date: product.published_date || "",
        },
      ];
      set({ wishlist: updatedWishlist, wishlistCount: updatedWishlist.length });
      toast.success("Product added to wishlist ❤️");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product ❌");
    }
  },

  removeFromWishlist: async (bookId) => {
    if (!bookId) return;
    const wishlist = get().wishlist;
    const targetItem = wishlist.find((item) => item.productId === bookId);
    if (!targetItem || !targetItem.wishlistId) return;

    try {
      await wishlistAPI.remove(targetItem.wishlistId);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error(
          error.response?.data?.message || "Failed to remove product ❌"
        );
      }
    }

    const updatedWishlist = wishlist.filter(
      (item) => item.wishlistId !== targetItem.wishlistId
    );
    set({ wishlist: updatedWishlist, wishlistCount: updatedWishlist.length });
    toast.success("Product removed from wishlist 💔");
  },

  clearWishlist: async () => {
    const wishlist = get().wishlist;
    try {
      for (const item of wishlist) {
        await get().removeFromWishlist(item.productId);
      }
    } catch (error) {
      toast.error("Failed to clear wishlist ❌");
    }
  },
}));

export default useStore;
