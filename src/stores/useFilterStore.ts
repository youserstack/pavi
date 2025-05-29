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

      toggleCategory: (item) => {
        set((state) => {
          const category = state.filter.category ?? [];
          if (category.includes(item)) {
            state.filter.category = category.filter((v) => v !== item);
          } else {
            state.filter.category = [...category, item];
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
