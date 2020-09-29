export default interface IProduct {
  id?: string;
  name: string;
  tags: [string];
  description: string;
  image: string;
  price: number;
  quantity: number;
}
