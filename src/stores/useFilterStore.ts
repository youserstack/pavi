import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useFilterStore = create<FilterStore>()(
  persist(
    immer((set, get) => ({
      filter: {},

      setFilter: (partialFilter) => {
        set((state) => {
          state.filter = { ...state.filter, ...partialFilter };
        });
      },

      toggleCategory: (categoryItem) => {
        set((state) => {
          const categoryItems = state.filter.category ?? [];
          if (categoryItems.includes(categoryItem)) {
            state.filter.category = categoryItems.filter((v) => v !== categoryItem);
          } else {
            state.filter.category = [...categoryItems, categoryItem];
          }
        });
      },

      setBrand: (brand) => {
        set((state) => {
          const current = state.filter.brands ?? [];
          if (current.includes(brand)) {
            state.filter.brands = current.filter((v) => v !== brand);
          } else {
            state.filter.brands = [...current, brand];
          }
        });
      },

      setType: (type) => {
        set((state) => {
          state.filter.type = type;
        });
      },

      resetFilter: () => {
        set((state) => {
          state.filter = {};
        });
      },

      reloadFilter: (partialFilter) => {
        set((state) => {
          state.filter = partialFilter;
        });
      },
    })),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
