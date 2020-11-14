// import { format } from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';

// import CartSchema from '../infra/databases/mongoose/schemas/CartSchema';
// import Cart from '../infra/databases/entities/Cart';
// import ICartDTO from '../dtos/ICartDTO';
// import ICartProvider from '../providers/ICartProvider';

// export default class CartsRepository implements ICartProvider {
//   public async findCartByUserId(user_id: string): Promise<Cart | null> {
//     const userCart = await CartSchema.findOne({ user_id });

//     return userCart;
//   }

//   public async createACart(user_id: string): Promise<void> {
//     const newDate = new Date();
//     const timeZone = 'America/Sao_Paulo';
//     const dateWithTimeZone = utcToZonedTime(newDate, timeZone);

//     const cartCreated = new CartSchema({
//       user_id,
//       created_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
//     });

//     await cartCreated.save();
//   }

//   public async updateCartProducts(
//     newProductsData: ICartDTO,
//   ): Promise<Cart | null> {
//     const newDate = new Date();
//     const timeZone = 'America/Sao_Paulo';
//     const dateWithTimeZone = utcToZonedTime(newDate, timeZone);

//     const cartUpdated = await CartSchema.findByIdAndUpdate(
//       newProductsData.user_id,
//       {
//         $set: newProductsData,
//         updated_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
//       },
//     );

//     return cartUpdated;
//   }

//   public async deleteProductFromCart({
//     product_id,
//     user_id,
//   }: string): Promise<void> {
//     const userCart = await CartSchema.findOne({ user_id });

//     userCart.u;
//   }
// }
