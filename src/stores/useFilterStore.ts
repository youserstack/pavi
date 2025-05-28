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

      setCategory: (category) => {
        set((state) => {
          const currentCategories = state.filter.category ?? [];
          if (currentCategories.includes(category)) {
            state.filter.category = currentCategories.filter((v) => v !== category);
          } else {
            state.filter.category = [...currentCategories, category];
          }
        });
      },

      setBrand: (brand) => {
        set((state) => {
          const current = state.filter.brand ?? [];
          if (current.includes(brand)) {
            state.filter.brand = current.filter((v) => v !== brand);
          } else {
            state.filter.brand = [...current, brand];
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

      reloadFilter: (filter) => {
        set((state) => {
          state.filter = filter;
        });
      },
    })),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
