import { Dispatch, SetStateAction } from 'react';

import Select, { MultiValue, StylesConfig, components } from 'react-select';

import { Category, FilterState } from '../../../ts/types/main/Product';

type FilterByCategoriesPropsType = {
  categories: Category[];
  styles: StylesConfig;
  selectedCategories: MultiValue<unknown | Category>;
  setSelectedCategories: Dispatch<
    SetStateAction<MultiValue<unknown | Category>>
  >;
  setFilterState: Dispatch<SetStateAction<FilterState>>;
};

const FilterByCategories: React.FC<FilterByCategoriesPropsType> = ({
  categories,
  styles,
  selectedCategories,
  setSelectedCategories,
  setFilterState,
}) => {
  return (
    <article className="w-full sm:w-[200px]">
      <Select
        instanceId="categories"
        placeholder="Categories"
        options={categories}
        styles={styles}
        menuPosition="fixed"
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        value={selectedCategories}
        onChange={(options: MultiValue<unknown | Category>) => {
          if (options) {
            setSelectedCategories(options);

            setFilterState((prevState) => {
              return {
                ...prevState,
                selectedCategories: options,
              };
            });
          }
        }}
        components={{
          ValueContainer: ({ children, ...props }) => (
            <components.ValueContainer {...props}>
              {selectedCategories.length > 2 ? (
                <span className="py-[2px] px-2 text-[85%] text-white rounded-[.275rem] -bg--primary-90">
                  {selectedCategories.length} Categories <span></span>
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
                  id={`categories-${(props.data as Category).value}`}
                  type="checkbox"
                  checked={props.isSelected}
                  onChange={() => !props.isSelected}
                  className="group-hover:cursor-pointer"
                />
                <label
                  htmlFor={`categories-${(props.data as Category).value}`}
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

export default FilterByCategories;
