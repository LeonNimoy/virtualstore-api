import User from '@modules/users/infra/databases/entities/User';
import Address from '@modules/users/infra/databases/entities/Address';
import Product from '@modules/products/infra/databases/entities/Product';

export default interface ICheckoutDTO {
  id?: string;
  customerId?: string;
  amount?: number;
  purchaseAmount?: number;
  cardHash: string;
  productId?: string;
  addressId?: string;
  cardId?: string;
  userData?: User;
  addressData?: Address;
  productData?: Product;
}
