import User from '@modules/users/infra/databases/entities/User';

export default interface ICartDTO {
  id?: string;
  user_id?: string | User;
  products?: [{ product_id: string; quantity: number; price: number }];
  product_id?: string;
}
