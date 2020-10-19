import IProductDTO from '../dtos/IProductDTO';
import IProductEntity from '../entities/IProductEntity';

export default interface IProductProvider {
  find(): Promise<IProductEntity[] | null>;
  findById(id: string | undefined): Promise<IProductEntity | null | undefined>;
  checkName(productName: string): Promise<boolean>;
  save(productData: IProductDTO): Promise<IProductEntity>;
  update(newProductData: IProductDTO): Promise<IProductEntity | null>;
  delete(product: IProductDTO): Promise<void | null>;
}
