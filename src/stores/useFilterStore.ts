import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Filter = {
  category?: string[];
  brand?: string[];
};

type FilterStore = {
  filter: Filter;
  setFilter: (partialFilter: Partial<Filter>) => void;
  setCategory: (category: string) => void;
};

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
    })),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
