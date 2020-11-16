export default interface ICartDTO {
  id?: string;
  user_id?: string;
  products: [{ product_id: string; quantity: number; price: number }];
  product_id?: string;
}
