import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/databases/entities/Product';

export default interface IProductProvider {
  findById(id: string | undefined): Promise<Product | null | undefined>;
  checkName(productName: string): Promise<boolean>;
  save(productData: IProductDTO): Promise<Product>;
  update(newProductData: IProductDTO): Promise<Product | null>;
  delete(product: IProductDTO): Promise<void | null>;
}
