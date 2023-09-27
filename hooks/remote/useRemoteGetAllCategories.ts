import { useMemo } from 'react';

import { Category } from '../../ts/types/main/Product';
import { useFetch } from '../useFetch';

const useRemoteGetAllCategories = () => {
  const url = '/products/categories';

  const { data, error, isFetching } = useFetch('getCategories', 'GET', url);

  const categories: Category[] = useMemo(
    () =>
      data?.data.map((category: string) => ({
        label: category.split('-').join(' '),
        value: category,
      })),
    [data?.data]
  );

  return { categories, error, isFetching };
};

export default useRemoteGetAllCategories;
