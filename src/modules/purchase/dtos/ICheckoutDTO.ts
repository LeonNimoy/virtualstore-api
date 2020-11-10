export default interface ICheckoutDTO {
  id?: string;
  customerId: string;
  amount: number;
  cardHash: string;
  productsId: [string];
  addressId: string;
  cardId?: string;
}
