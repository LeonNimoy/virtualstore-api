import User from '@modules/users/infra/databases/entities/User';
import Address from '@modules/users/infra/databases/entities/Address';
import Product from '@modules/products/infra/databases/entities/Product';
import Cart from '@modules/purchase/infra/databases/entities/Cart';

export default interface ICheckoutDTO {
  id?: string;
  customer_id?: string;
  amount?: number;
  purchaseAmount?: number;
  cardHash?: string;
  product_id?: string;
  address_id?: string;
  cart_id?: string;
  cartData?: Cart;
  userData?: User;
  addressData?: Address;
  products: [
    {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
    },
  ];
  productData?: Product;
}
