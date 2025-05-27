type Filter = {
  category?: string[];
  brand?: string[];
};

type FilterStore = {
  filter: Filter;
  setFilter: (partialFilter: Partial<Filter>) => void;
  setCategory: (category: string) => void;
  setBrand: (brand: string) => void;
  resetFilter: () => void;
};
