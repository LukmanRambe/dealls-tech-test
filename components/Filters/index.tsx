import { Dispatch, SetStateAction } from 'react';

import { MultiValue } from 'react-select';

import FilterByBrands from './FilterByBrands';
import FilterByCategories from './FilterByCategories';
import FilterByPrice from './FilterByPrice';
import { reactSelectStyles } from '../../libs/reactSelectStyles';
import {
  Brand,
  Category,
  FilterState,
  Price,
} from '../../ts/types/main/Product';

type FiltersPropsType = {
  price: Price;
  setPrice: Dispatch<SetStateAction<Price>>;
  categories: Category[];
  brands: Brand[];
  selectedCategories: MultiValue<unknown | Category>;
  setSelectedCategories: Dispatch<
    SetStateAction<MultiValue<unknown | Category>>
  >;
  selectedBrands: MultiValue<unknown | Brand>;
  setSelectedBrands: Dispatch<SetStateAction<MultiValue<unknown | Brand>>>;
  setFilterState: Dispatch<SetStateAction<FilterState>>;
};

const Filters: React.FC<FiltersPropsType> = ({
  price,
  setPrice,
  categories,
  brands,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  setFilterState,
}) => {
  return (
    <>
      <FilterByCategories
        styles={reactSelectStyles}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setFilterState={setFilterState}
      />

      <FilterByBrands
        styles={reactSelectStyles}
        brands={brands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        setFilterState={setFilterState}
      />

      <FilterByPrice
        price={price}
        setPrice={setPrice}
        setFilterState={setFilterState}
      />
    </>
  );
};

export default Filters;
