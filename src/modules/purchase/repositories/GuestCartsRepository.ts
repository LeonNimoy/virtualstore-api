import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

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
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = utcToZonedTime(newDate, timeZone);

    const newGuestCart = new GuestCartSchema({
      guestToken,
      created_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
    });

    const guestCartCreated = await newGuestCart.save();

    return guestCartCreated;
  }

  public async updateGuestGuestCartProducts(
    newProductsData: ICartDTO,
  ): Promise<GuestCart | null> {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = utcToZonedTime(newDate, timeZone);

    const guestCartUpdated = await GuestCartSchema.findOneAndUpdate(
      { guestToken: newProductsData.guestToken },
      {
        $set: newProductsData,
        updated_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
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
