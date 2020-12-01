export default interface GuestCart {
  id?: string;
  guestToken: string;
  products?:
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
