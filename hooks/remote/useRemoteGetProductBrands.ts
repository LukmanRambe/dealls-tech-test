import { useMemo } from 'react';

import { Brand, Product, Products } from '../../ts/types/main/Product';
import { useFetch } from '../useFetch';

const useRemoteGetAllBrands = () => {
  const url = '/products';

  const { data, error, isFetching } = useFetch('getBrands', 'GET', url, {
    limit: 100,
    skip: 0,
  });
  const setBrandsData: string[] = useMemo(
    () => [
      ...new Set(
        (data?.data.products as Products['data'])?.map(
          (product: Product) => product.brand
        )
      ),
    ],
    [data?.data.products]
  );

  const brands: Brand[] = useMemo(
    () =>
      setBrandsData?.map((brand) => ({
        label: brand,
        value: brand,
      })),
    [data?.data.products]
  );

  return { brands, error, isFetching };
};

export default useRemoteGetAllBrands;
