import { useState, useMemo } from 'react';

import { PaginationState } from '@tanstack/react-table';
import { GetServerSideProps } from 'next';

import Layout from '../../../components/Layout';
import Table from '../../../components/Table';
import useRemoteGetCart from '../../../hooks/remote/useRemoteGetCart';
import { NextPageWithLayout } from '../../../ts/types/NextPageWithLayout';
import { formatPrice } from '../../../utils/formatPrice';
import { cartProductsColumns } from '../../../utils/generateData';

type CartPropsType = {
  cartId: number;
};

const Cart: NextPageWithLayout<CartPropsType> = ({ cartId }) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );
  const { cart, isFetching } = useRemoteGetCart(cartId);

  return (
    <>
      <article className="flex flex-col w-full gap-5 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold tracking-wide -text--primary">
          Cart - {cart?.id}
        </h2>

        <div className="p-5 border-2 border-dashed rounded-md -border--primary-20 -bg--primary-10">
          <h3 className="text-lg font-medium tracking-wide -text--primary">
            Details
          </h3>

          <article className="grid grid-cols-1 mt-5 gap-y-4 md:grid-cols-2">
            <span className="tracking-wide">
              User :{' '}
              <span className="block font-medium sm:inline">
                {`${cart?.user.firstName} ${cart?.user.lastName}`}
              </span>
            </span>
            <span className="tracking-wide">
              Total Products :{' '}
              <span className="block font-medium sm:inline">
                {`${cart?.totalProducts ?? 0} Products`}
              </span>
            </span>

            <span className="tracking-wide">
              Total Price :{' '}
              <span className="block font-medium sm:inline">
                {formatPrice(cart?.total ?? 0)}
              </span>
            </span>
            <span className="tracking-wide">
              Total Quantity:{' '}
              <span className="block font-medium sm:inline">
                {cart?.totalQuantity ?? 0}
              </span>
            </span>
          </article>
        </div>
      </article>

      <Table
        tableType="cartProducts"
        data={cart?.products}
        columns={cartProductsColumns}
        isFetching={isFetching}
        pageSize={pageSize}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

Cart.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      cartId: id,
    },
  };
};

export default Cart;
