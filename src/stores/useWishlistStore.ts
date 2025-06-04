import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    immer((set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        set((state) => {
          const index = state.wishlist.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            state.wishlist.splice(index, 1); // 배열에서 직접 제거
          } else {
            state.wishlist.push(product); // 배열에 직접 추가
          }

          // const exists = state.wishlist.find((p) => p.id === product.id);
          // if (exists) {
          //   state.wishlist = state.wishlist.filter((p) => p.id !== product.id);
          // } else {
          //   state.wishlist = [...state.wishlist, product];
          // }
        });
      },

      clearWishlist: () => {
        set((state) => (state.wishlist = []));
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },
    })),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Next.js hydration 오류 방지
      // Next.js 서버사이드 렌더링(SSR) 중에는 localStorage가 없어서 접근 불가합니다.
      // 이 때문에 서버에서 렌더링한 초기 상태와 클라이언트에서 localStorage를 읽은 상태가 달라져
      // React의 hydration 오류가 발생할 수 있습니다.
      // skipHydration: true 옵션을 사용하면 초기 hydration 단계에서는
      // persist된 상태를 적용하지 않고, 클라이언트 마운트 후에만 localStorage를 불러와서
      // hydration mismatch 문제를 방지할 수 있습니다.
    }
  )
);
