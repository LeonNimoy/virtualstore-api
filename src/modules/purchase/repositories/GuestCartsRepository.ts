import GuestCartSchema from '../infra/databases/mongoose/schemas/GuestCartSchema';
import GuestCart from '../infra/databases/entities/GuestCart';
import ICartDTO from '../dtos/ICartDTO';
import IGuestCartProvider from '../providers/IGuestCartProvider';

export default class GuestCartsRepository implements IGuestCartProvider {
  public async findGuestCartByGuestToken(
    guestToken: string,
  ): Promise<GuestCart | null> {
    const guestCart = await GuestCartSchema.findOne({ guestToken });
    return guestCart;
  }

  public async createAGuestGuestCart(guestToken: ICartDTO): Promise<GuestCart> {
    const newGuestCart = new GuestCartSchema({
      guestToken,
    });

    const guestCartCreated = await newGuestCart.save();

    return guestCartCreated;
  }

  public async updateGuestGuestCartProducts(
    newProductsData: ICartDTO,
  ): Promise<GuestCart | null> {
    const guestCartUpdated = await GuestCartSchema.findOneAndUpdate(
      { guestToken: newProductsData.guestToken },
      {
        $set: newProductsData,
      },
      {
        new: true,
      },
    );

    return guestCartUpdated;
  }

  public async deleteGuestGuestCart(guestToken: string): Promise<void> {
    await GuestCartSchema.findOneAndDelete({ guestToken });
  }
}
