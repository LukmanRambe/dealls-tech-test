import { useMemo } from 'react';

import { Products } from '../../ts/types/main/Product';
import { useFetch } from '../useFetch';

const useRemoteGetAllProducts = (query: string) => {
  const url = '/products/search';

  const { data, error, isFetching } = useFetch(
    ['getProducts', { query }],
    'GET',
    url,
    { limit: 100, skip: 0, q: query }
  );

  const products: Products = useMemo(
    () => ({
      data: data?.data.products,
      pagination: {
        total: data?.data.total,
        limit: data?.data.limit,
      },
    }),
    [data?.data]
  );

  return { products, error, isFetching };
};

export default useRemoteGetAllProducts;
