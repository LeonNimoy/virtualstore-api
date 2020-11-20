export default interface Checkout {
  id?: string;
  customerId: string;
  amount: number;
  cardHash: string;
  productsId: [string];
  addressId: string;
  cardId?: string;
}
