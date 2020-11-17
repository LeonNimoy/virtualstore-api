export default interface Product {
  id?: string;
  name: string;
  tags: Array<string>;
  description: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string | Date;
  updated_at: string | Date;
}
