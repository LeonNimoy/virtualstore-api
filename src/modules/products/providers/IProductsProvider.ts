import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/databases/entities/Product';

export default interface IProductProvider {
  findProductById(
    product_id: string | undefined,
  ): Promise<Product | null | undefined>;
  checkExistentNameProduct(productName: string): Promise<boolean>;
  saveProduct(productData: IProductDTO): Promise<Product>;
  updateProduct(newProductData: IProductDTO): Promise<Product | null>;
  deleteProduct(product: IProductDTO): Promise<void | null>;
}
