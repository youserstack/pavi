type Filter = {
  category?: string[];
  brand?: string[];
  type?: string;
};

type FilterStore = {
  filter: Filter;
  setFilter: (partialFilter: Partial<Filter>) => void;
  setCategory: (category: string) => void;
  setBrand: (brand: string) => void;
  setType: (type: string) => void;
  resetFilter: () => void;
};
