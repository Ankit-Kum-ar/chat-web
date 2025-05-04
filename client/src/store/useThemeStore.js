import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "dark", // Default theme
  setTheme: (newTheme) => {
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage
    document.documentElement.setAttribute("data-theme", newTheme); // Apply theme to <html>
    set({ theme: newTheme });
  },
}));