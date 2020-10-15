import IProductDTO from '../dtos/IProductDTO';
import IProductEntity from '../entities/IProductEntity';

export default interface IProductProvider {
  find(): Promise<IProductEntity[]>;
  findById(id: string | undefined): Promise<IProductEntity>;
  checkName(productName: string): Promise<boolean>;
  save(productData: IProductDTO): Promise<IProductEntity>;
  update(newProductData: IProductDTO): Promise<IProductEntity>;
  delete(product: IProductDTO): Promise<void>;
}
