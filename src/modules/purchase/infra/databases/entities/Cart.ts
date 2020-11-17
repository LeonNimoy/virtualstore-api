import User from '@modules/users/infra/databases/entities/User';

export default interface Cart {
  id?: string;
  user_id: string | User;
  products: [string];
  status?: 'active' | 'inactive';
}
