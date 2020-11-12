import ICheckoutDTO from '../dtos/ICheckoutDTO';
import Checkout from '../infra/databases/entities/Checkout';

export default interface ICheckoutProvider {
  save(userData: ICheckoutDTO): Promise<Checkout>;
}
