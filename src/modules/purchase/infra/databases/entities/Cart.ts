import User from '@modules/users/infra/databases/entities/User';

export default interface Cart {
  id?: string;
  user_id: string | User;
  products: [
    { product_id: string; name: string; quantity: number; price: number },
  ];
  status?: 'active' | 'inactive';
}
