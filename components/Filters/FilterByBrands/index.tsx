import { Dispatch, SetStateAction } from 'react';

import Select, { MultiValue, StylesConfig, components } from 'react-select';

import { Brand, FilterState } from '../../../ts/types/main/Product';

type FilterByBrandsPropsType = {
  brands: Brand[];
  styles: StylesConfig;
  selectedBrands: MultiValue<unknown | Brand>;
  setSelectedBrands: Dispatch<SetStateAction<MultiValue<unknown | Brand>>>;
  setFilterState: Dispatch<SetStateAction<FilterState>>;
};

const FilterByBrands: React.FC<FilterByBrandsPropsType> = ({
  brands,
  styles,
  selectedBrands,
  setSelectedBrands,
  setFilterState,
}) => {
  return (
    <article className="w-full sm:w-[200px]">
      <Select
        instanceId="brands"
        placeholder="Brands"
        options={brands}
        styles={styles}
        menuPosition="fixed"
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        value={selectedBrands}
        onChange={(options: MultiValue<unknown | Brand>) => {
          if (options) {
            setSelectedBrands(options);

            setFilterState((prevState) => {
              return {
                ...prevState,
                selectedBrands: options,
              };
            });
          }
        }}
        components={{
          ValueContainer: ({ children, ...props }) => (
            <components.ValueContainer {...props}>
              {selectedBrands.length > 2 ? (
                <span className="py-[2px] px-2 text-[85%] text-white rounded-[.275rem] -bg--primary-90">
                  {selectedBrands.length} Brands
                </span>
              ) : (
                children
              )}
            </components.ValueContainer>
          ),
          Option: ({ children, ...props }) => (
            <components.Option {...props} isSelected={props.isSelected}>
              <div className="flex items-center gap-2 group">
                <input
                  id={`brand-${(props.data as Brand).value}`}
                  type="checkbox"
                  checked={props.isSelected}
                  onChange={() => !props.isSelected}
                  className="group-hover:cursor-pointer"
                />

                <label
                  htmlFor={`brand-${(props.data as Brand).value}`}
                  className="group-hover:cursor-pointer"
                >
                  {children}
                </label>
              </div>
            </components.Option>
          ),
        }}
      />
    </article>
  );
};

export default FilterByBrands;
