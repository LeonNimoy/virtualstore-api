export default interface IProductEntity {
  _id?: string;
  name: string;
  tags: Array<string>;
  description: string;
  image: string;
  price: number;
  quantity: number;
}
