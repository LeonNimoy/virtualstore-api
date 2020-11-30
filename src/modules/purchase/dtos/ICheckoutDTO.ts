import User from '@modules/users/infra/databases/entities/User';
import Product from '@modules/products/infra/databases/entities/Product';
import Cart from '@modules/purchase/infra/databases/entities/Cart';

export default interface ICheckoutDTO {
  id?: string;
  customer_id?: string;
  amount: number;
  cart_id?: string;
  cartData?: Cart;
  userData?: User;
  products?: [
    {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
    },
  ];
  productsWithValidFormat?: {
    id: string;
    title: string;
    unit_price: number;
    quantity: number;
    tangible: boolean;
  }[];
  productData?: Product;
  payment_token: string;
  payment_method: string;
}
