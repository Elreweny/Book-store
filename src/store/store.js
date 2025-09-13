// src/store/store.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token") || null,
  setToken: (token) => {
    if (token) {
      sessionStorage.setItem("token", token);
      set({ token });
    } else {
      sessionStorage.removeItem("token");
      set({ token: null });
    }
  },
  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null });
  },
  isLoggedIn: () => Boolean(sessionStorage.getItem("token")),
}));

export default useAuthStore;
