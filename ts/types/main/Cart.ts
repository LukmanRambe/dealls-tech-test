import { User } from './User';

export type Cart = {
  id: number;
  userId: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
  user: User;
  products: CartProducts[];
};

export type Carts = {
  data: Cart[];
  pagination: {
    total: number;
    limit: number;
  };
};

export type CartProducts = {
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};
