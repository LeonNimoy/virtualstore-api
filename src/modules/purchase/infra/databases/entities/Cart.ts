import User from '@modules/users/infra/databases/entities/User';

export default interface Cart {
  id?: string;
  user_id: string | User;
  products:
    | [
        {
          id?: string;
          title?: string;
          unit_price?: number;
          quantity?: number;
          tangible?: boolean;
          image?: string;
        },
      ]
    | [];
  status?: 'active' | 'inactive';
}
