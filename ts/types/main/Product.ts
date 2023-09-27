import { MultiValue } from 'react-select';

export type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
};

export type Products = {
  data: Product[];
  pagination: {
    total: number;
    limit: number;
  };
};

export type Category = {
  label: string;
  value: string;
};

export type Brand = {
  label: string;
  value: string;
};

export type Price = {
  min: string;
  max: string;
};

export type FilterState = {
  filterState: {
    price: Price;
    selectedCategories: MultiValue<unknown | Category>;
    selectedBrands: MultiValue<unknown | Brand>;
  };
};
