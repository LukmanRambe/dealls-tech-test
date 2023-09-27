import { useMemo } from 'react';

import useRemoteGetUserById from './useRemoteGetUserById';
import { Cart } from '../../ts/types/main/Cart';
import { useFetch } from '../useFetch';

const useRemoteGetAllCart = (cartId: number) => {
  const url = `/cart/${cartId}`;

  const { data, error, isFetching } = useFetch(
    ['getCart', { cartId }],
    'GET',
    url
  );
  const { user } = useRemoteGetUserById(data?.data?.userId ?? 1);

  const cart: Cart = useMemo(
    () => ({
      id: data?.data.id,
      userId: data?.data.userId,
      total: data?.data.total,
      totalProducts: data?.data.totalProducts,
      totalQuantity: data?.data.totalQuantity,
      discountedTotal: data?.data.discountedTotal,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      products: data?.data.products,
    }),
    [data?.data]
  );

  return { cart, error, isFetching };
};

export default useRemoteGetAllCart;
