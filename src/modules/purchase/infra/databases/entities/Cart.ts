export default interface Cart {
  id?: string;
  user_id: string;
  products: [{ product_id: string; quantity: number; price: number }];
  status?: 'active' | 'inactive';
}
