import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { BsCart4, BsBoxes } from 'react-icons/bs';

import { formatPrice } from './formatPrice';
import useRemoteGetUserById from '../hooks/remote/useRemoteGetUserById';
import { Cart, CartProducts } from '../ts/types/main/Cart';
import { Product } from '../ts/types/main/Product';
import { SidebarMenus } from '../ts/types/main/Sidebar';

export const generateSidebarMenus = (): SidebarMenus => {
  const classNames = 'flex-shrink-0 transition duration-75';

  const sidebarMenus = [
    {
      name: 'Products',
      href: '/products',
      icon: <BsBoxes className={classNames} />,
    },
    {
      name: 'Carts',
      href: '/carts',
      icon: <BsCart4 className={classNames} />,
    },
  ];

  return sidebarMenus;
};

export const productsColumns: ColumnDef<Product>[] = [
  {
    header: 'No.',
    cell: (props) => +props.row.id + 1,
  },
  {
    accessorKey: 'title',
    header: 'Product Name',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (price) => formatPrice(price.getValue() as number),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (category) => (category.getValue() as string).split('-').join(' '),
  },
];

export const cartsColumns: ColumnDef<Cart>[] = [
  {
    header: 'No.',
    cell: (props) => +props.row.id + 1,
  },
  {
    accessorKey: 'userId',
    header: "User's Full Name",
    cell: (userId) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { user } = useRemoteGetUserById(userId?.getValue() as number);

      return (
        <Link href={`/carts/detail/${userId?.row.original.id}`}>
          {user?.firstName} {user?.lastName}
        </Link>
      );
    },
  },
  {
    accessorKey: 'totalProducts',
    header: 'Total Products',
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Total Quantity',
  },
  {
    accessorKey: 'discountedTotal',
    header: 'Total Discounted Price',
    cell: (discountedPrice) =>
      formatPrice(discountedPrice.getValue() as number),
  },
];

export const cartProductsColumns: ColumnDef<CartProducts>[] = [
  {
    header: 'No.',
    cell: (props) => +props.row.id + 1,
  },
  {
    accessorKey: 'title',
    header: 'Product Name',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (price) => `${formatPrice(price.getValue() as number)}`,
  },
  {
    accessorKey: 'total',
    header: 'Total Price',
    cell: (totalPrice) => `${formatPrice(totalPrice.getValue() as number)}`,
  },
  {
    accessorKey: 'discountPercentage',
    header: 'Discount Percentage',
    cell: (discountedPrice) => `${discountedPrice.getValue()}%`,
  },
  {
    accessorKey: 'discountedPrice',
    header: 'Total Discounted Price',
    cell: (discountedPrice) =>
      formatPrice(discountedPrice.getValue() as number),
  },
];
