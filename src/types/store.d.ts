type Filter = {
  category?: string[];
  brand?: string[];
  type?: string[];
};

type FilterStore = {
  filter: Filter;
  setFilter: (partialFilter: Partial<Filter>) => void;
  toggleCategory: (category: string) => void;
  setBrand: (brand: string) => void;
  setType: (type: string) => void;
  resetFilter: () => void;
  reloadFilter: (partialFilter: Partial<Filter>) => void;
};
