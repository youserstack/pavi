import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (newItem: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      items: [],

      addToCart: (newItem) => {
        set((state: CartStore) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);
          if (existingItem) existingItem.quantity += newItem.quantity;
          else state.items.push(newItem);
        });
      },

      updateQuantity: (id, quantity) => {
        set((state: CartStore) => {
          const item = state.items.find((item) => item.id === id);
          if (item) item.quantity = quantity;
        });
      },

      removeFromCart: (id) => {
        set((state: CartStore) => {
          state.items = state.items.filter((item) => item.id !== id);
        });
      },

      clearCart: () => {
        set((state: CartStore) => {
          state.items = [];
        });
      },
    })),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   addToCart: (newItem: CartItem) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       addToCart: (newItem) => {
//         set((state) => {
//           const existingItem = state.items.find((item) => item.id === newItem.id);
//           // 이미 있는 아이템이면 수량만 증가
//           if (existingItem) {
//             const updatedItems = state.items.map((item) =>
//               item.id === newItem.id
//                 ? { ...item, quantity: item.quantity + newItem.quantity }
//                 : item
//             );
//             return { items: updatedItems };
//           }
//           // 새 아이템 추가
//           const newItems = [...state.items, newItem];
//           return { items: newItems };
//         });
//       },

//       updateQuantity: (id, quantity) => {
//         set((state) => ({ items: state.items.map((v) => (v.id === id ? { ...v, quantity } : v)) }));
//       },

//       removeFromCart: (id) => {
//         set((state) => ({ items: state.items.filter((v) => v.id !== id) }));
//       },

//       clearCart: () => {
//         set({ items: [] });
//       },
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => localStorage),
//       // partialize: (state) => ({ items: state.items }), // 저장할 상태를 제한
//     }
//   )
// );
