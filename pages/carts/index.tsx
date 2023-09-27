import { useState, useMemo } from 'react';

import { PaginationState } from '@tanstack/react-table';

import Layout from '../../components/Layout';
import Table from '../../components/Table';
import useRemoteGetAllCarts from '../../hooks/remote/useRemoteGetAllCarts';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';
import { cartsColumns } from '../../utils/generateData';

const Carts: NextPageWithLayout = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );
  const { carts, isFetching } = useRemoteGetAllCarts();

  return (
    <>
      <Table
        tableType="carts"
        data={carts?.data}
        columns={cartsColumns}
        isFetching={isFetching}
        pageSize={pageSize}
        pageCount={Math.ceil(carts?.pagination?.total / pageSize)}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

Carts.getLayout = (page) => <Layout>{page}</Layout>;

export default Carts;
