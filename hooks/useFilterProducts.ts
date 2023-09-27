import { useMemo } from 'react';

import { useQuery } from 'react-query';
import { MultiValue } from 'react-select';

import useRemoteGetAllProducts from './remote/useRemoteGetAllProducts';
import type { Brand, Category, Price } from '../ts/types/main/Product';

type FilterProductsParamsType = {
  selectedCategories: MultiValue<unknown | Category>;
  selectedBrands: MultiValue<unknown | Brand>;
  price: Price;
  query: string;
  pageIndex: number;
  pageSize: number;
};

const useFilterProducts = ({
  selectedCategories,
  selectedBrands,
  price,
  query,
  pageIndex,
  pageSize,
}: FilterProductsParamsType) => {
  const { products } = useRemoteGetAllProducts(query);
  const productsData = products?.data ?? [];

  const filteredProductsByPriceRange = useMemo(() => {
    if (Number(price?.max) <= 0) {
      return productsData;
    }

    return productsData.filter((product) => {
      if (!price) {
        return true;
      }

      return (
        product.price >= Number(price.min) && product.price <= Number(price.max)
      );
    });
  }, [productsData, price, query]);

  const filteredProductsByCategories = useMemo(() => {
    return filteredProductsByPriceRange?.filter((product) => {
      if (!selectedCategories?.length) {
        return true;
      }

      const categoriesValue = selectedCategories?.map(
        (category) => (category as Category).value
      );

      return categoriesValue?.includes(product.category);
    });
  }, [productsData, price, selectedCategories, query]);

  const filteredProductsByBrands = useMemo(() => {
    return filteredProductsByCategories?.filter((product) => {
      if (!selectedBrands?.length) {
        return true;
      }

      const brandsValue = selectedBrands?.map(
        (brand) => (brand as Brand).value
      );

      return brandsValue?.includes(product.brand);
    });
  }, [productsData, price, selectedBrands, selectedCategories, query]);

  const filteredProducts = filteredProductsByBrands;

  const {
    data: filteredProductsData = products,
    error,
    isFetching,
  } = useQuery(
    [
      'filteredProducts',
      productsData,
      price,
      selectedBrands,
      selectedCategories,
      query,
      pageSize,
      pageIndex,
    ],
    {
      queryFn: () => {
        return {
          data: filteredProducts,
          pagination: {
            total: filteredProductsByBrands.length,
            limit: pageSize,
          },
        };
      },
      enabled: true,
      staleTime: 3600000,
      keepPreviousData: true,
    }
  );

  return { filteredProductsData, isFetching, error };
};

export default useFilterProducts;
