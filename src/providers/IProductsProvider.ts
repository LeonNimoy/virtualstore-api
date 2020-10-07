import IProductDTO from '../dtos/IProductDTO';
import IProductEntity from '../entities/IProductEntity';

export default interface IProductProvider {
  find(id: string | undefined): Promise<IProductEntity>;
  save(productData: IProductDTO): Promise<IProductEntity>;
  update(newProductData: IProductDTO): Promise<IProductEntity>;
  delete(product: IProductDTO): Promise<void>;
}
