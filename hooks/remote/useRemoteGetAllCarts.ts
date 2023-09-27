import { useMemo } from 'react';

import { Carts } from '../../ts/types/main/Cart';
import { useFetch } from '../useFetch';

const useRemoteGetAllCarts = () => {
  const url = '/carts';

  const { data, error, isFetching } = useFetch('getCarts', 'GET', url, {
    limit: 100,
    skip: 0,
  });

  const carts: Carts = useMemo(
    () => ({
      data: data?.data?.carts,
      pagination: {
        total: data?.data.total,
        limit: data?.data.limit,
      },
    }),
    [data?.data]
  );

  return { carts, error, isFetching };
};

export default useRemoteGetAllCarts;
