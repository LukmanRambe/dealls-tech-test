import { useState, useEffect, useMemo } from 'react';

import { PaginationState } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { MultiValue } from 'react-select';

import Filters from '../../components/Filters';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useRemoteGetAllCategories from '../../hooks/remote/useRemoteGetAllCategories';
import useRemoteGetAllBrands from '../../hooks/remote/useRemoteGetProductBrands';
import useDebounce from '../../hooks/useDebounce';
import useFilterProducts from '../../hooks/useFilterProducts';
import type {
  Brand,
  Category,
  FilterState,
  Price,
} from '../../ts/types/main/Product';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';
import { productsColumns } from '../../utils/generateData';

const Chart = dynamic(() => import('../../components/Chart'), { ssr: false });

const Products: NextPageWithLayout = () => {
  const [filterState, setFilterState] = useState<FilterState>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('FILTER_STATE') || '{}') || {};
    }
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const [price, setPrice] = useState<Price>({ min: '', max: '' });
  const { categories } = useRemoteGetAllCategories();
  const { brands } = useRemoteGetAllBrands();
  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<unknown | Category>
  >([]);
  const [selectedBrands, setSelectedBrands] = useState<
    MultiValue<unknown | Brand>
  >([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const { filteredProductsData, isFetching } = useFilterProducts({
    selectedCategories,
    selectedBrands,
    price,
    query: debouncedQuery,
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('FILTER_STATE') !== null) {
        const savedFilters = JSON.parse(
          localStorage.getItem('FILTER_STATE') || '{}'
        );

        if (savedFilters) {
          setFilterState(savedFilters);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('FILTER_STATE', JSON.stringify(filterState));
    }
  }, [filterState]);

  return (
    <>
      <section className="flex items-center justify-center w-full h-full p-5 mb-12 bg-white rounded-md shadow-md">
        <Chart />
      </section>

      <section className="flex flex-col items-center h-full gap-3 sm:flex-row">
        <SearchBar
          searchQuery={searchQuery}
          onSearch={(event) => handleSearch(event.currentTarget.value)}
        />

        <Filters
          price={price}
          setPrice={setPrice}
          categories={categories}
          brands={brands}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          setFilterState={setFilterState}
        />
      </section>

      <Table
        tableType="products"
        data={filteredProductsData?.data}
        columns={productsColumns}
        isFetching={isFetching}
        pageSize={pageSize}
        pageCount={Math.ceil(
          filteredProductsData?.pagination?.total / pageSize
        )}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

Products.getLayout = (page) => <Layout>{page}</Layout>;

export default Products;
