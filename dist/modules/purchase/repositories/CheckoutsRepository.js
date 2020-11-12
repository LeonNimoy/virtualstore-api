// import CheckoutSchema from '../infra/databases/mongoose/schemas/CheckoutSchema';
// import Checkout from '../infra/databases/entities/Checkout';
// import ICheckoutDTO from '../dtos/ICheckoutDTO';
// import ICheckoutProvider from '../providers/ICheckoutProvider';
// export default class CheckoutsRepository implements ICheckoutProvider {
//   public async save({
//     addressId,
//     amount,
//     cardHash,
//     customerId,
//     productsId,
//     cardId,
//   }: ICheckoutDTO): Promise<Checkout> {
//     const checkoutCreated = new CheckoutSchema({
//       addressId,
//       amount,
//       cardHash,
//       customerId,
//       productsId,
//       cardId,
//     });
//     await checkoutCreated.save();
//     return checkoutCreated.id;
//   }
// }
"use strict";