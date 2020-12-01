import ICartDTO from '../dtos/ICartDTO';
import GuestCart from '../infra/databases/entities/GuestCart';

export default interface IGuestCartProvider {
  findGuestCartByGuestToken(
    guestToken: string | undefined,
  ): Promise<GuestCart | null>;
  createAGuestGuestCart(guestToken: ICartDTO): Promise<GuestCart>;
  updateGuestGuestCartProducts(
    newProductsData: ICartDTO,
  ): Promise<GuestCart | null>;
  deleteGuestGuestCart(guestToken: string): Promise<void>;
}
