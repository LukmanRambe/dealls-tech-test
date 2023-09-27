import { Dispatch, SetStateAction, useState } from 'react';

import { Popover } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

import { Price, FilterState } from '../../../ts/types/main/Product';
import { formatPrice } from '../../../utils/formatPrice';
import CurrencyInput from '../../CurrencyInput';

type FilterByPricePropType = {
  price: Price;
  setPrice: Dispatch<SetStateAction<Price>>;
  setFilterState: Dispatch<SetStateAction<FilterState>>;
};

const FilterByPrice: React.FC<FilterByPricePropType> = ({
  price,
  setPrice,
  setFilterState,
}) => {
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numberValue = value.replace(/\D/g, '');
    setError(false);

    setPrice((prevState) => {
      return {
        ...prevState,
        [event.target.name]: Number(numberValue),
      };
    });

    setFilterState((prevState) => {
      return {
        ...prevState,
        price: {
          ...price,
          [event.target.name]: Number(numberValue),
        },
      };
    });
  };

  return (
    <Popover className="relative w-full sm:w-[200px]">
      <Popover.Button className="flex items-center justify-between bg-white py-2 px-3 rounded-md w-full ring-1 -ring--primary-50 hover:-ring--primary-90 active:-ring--primary transition-all ease-in-out duration-[.08s] hover:cursor-pointer text-gray-500 focus:outline-none focus:ring-1 group">
        {+price?.min !== 0 || +price?.max !== 0
          ? `${formatPrice(+price?.min)} - ${formatPrice(+price?.max)}`
          : 'Price'}
        <div className="flex items-center gap-2">
          <span className="font-thin text-gray-400">|</span>
          <span className="-text--primary-90 hover:-text--primary-50 group-focus-within:-text--primary-10">
            <FaChevronDown className="w-[13px] h-[13px]" />
          </span>
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute w-full px-3 py-4 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
        <form className="flex flex-col gap-3">
          <CurrencyInput
            id="min"
            name="min"
            label="Min. Price"
            placeholder="Min. Price"
            onChange={handleChange}
            value={price?.min}
          />

          <CurrencyInput
            id="max"
            name="max"
            label="Max. Price"
            placeholder="Max. Price"
            onChange={handleChange}
            value={price?.max}
          />

          <div className="flex flex-col gap-2">
            {error && (
              <span className="w-full p-2 text-sm font-medium text-center text-red-700 bg-red-200 rounded-md">
                Max. Price is required
              </span>
            )}

            <article className="flex flex-col justify-between gap-2 mt-4 lg:flex-row">
              <button
                type="reset"
                className="w-full px-4 py-1 pb-2 font-semibold tracking-wide text-white border-none rounded-md outline-none -bg--primary-90 hover:-bg--primary"
                onClick={() => setPrice({ min: '', max: '' })}
              >
                Reset
              </button>
            </article>
          </div>
        </form>
      </Popover.Panel>
    </Popover>
  );
};

export default FilterByPrice;
