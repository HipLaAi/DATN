// src/store/authStore.ts
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

// AuthState interface
interface AuthState {
  id: string | null;
  setId: (id: string) => void;
  clearId: () => void;
}

// Khai báo PersistStorage tuỳ chỉnh
const myStorage: PersistStorage<AuthState> = {
  getItem: (key: string) => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (e) {
      console.error("Error parsing data from localStorage", e);
      return null;
    }
  },

  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Error saving data to localStorage", e);
    }
  },

  // Xóa dữ liệu khỏi localStorage
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

// Tạo zustand store với persist
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      id: null,
      setId: (id: string) => set({ id }),
      clearId: () => set({ id: null }),
    }),
    {
      name: "auth-storage", 
      storage: myStorage, 
    }
  )
);
