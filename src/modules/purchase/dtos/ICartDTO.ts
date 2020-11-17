import User from '@modules/users/infra/databases/entities/User';

export default interface ICartDTO {
  id?: string;
  user_id?: string | User;
  products?: [string];
  product_id?: string;
}
