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
      // onRehydrateStorage: (state) => {
      //   console.log("hydration starts"); // 스토리지로부터 상태를 불러오기 시작할 때 출력

      //   return (state, error) => {
      //     if (error) {
      //       console.log("an error happened during hydration", error); // 에러 발생 시 출력
      //     } else {
      //       console.log("hydration finished"); // 정상적으로 hydration 완료 시 출력
      //     }
      //   };
      // },
    }
  )
);
