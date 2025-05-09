import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface WishItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishItem[];
  addToWishlist: (newItem: WishItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    immer((set, get) => ({
      items: [],

      addToWishlist: (newItem) => {
        set((state: WishlistStore) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);
          if (!existingItem) state.items.push(newItem);
        });
      },

      removeFromWishlist: (id) => {
        set((state: WishlistStore) => {
          state.items = state.items.filter((item) => item.id !== id);
        });
      },

      clearWishlist: () => {
        set((state: WishlistStore) => {
          state.items = [];
        });
      },

      // 위시리스트 버튼을 토글하기 위해서 사용되는 기능
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
    })),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
