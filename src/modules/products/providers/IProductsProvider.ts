import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/databases/entities/Product';

export default interface IProductProvider {
  findProductById(
    product_id: string | undefined,
  ): Promise<Product | null | undefined>;
  checkExistentNameProduct(productName: string): Promise<boolean>;
  saveProduct(productData: IProductDTO): Promise<Product>;
  updateProduct(newProductData: IProductDTO): Promise<Product | null>;
  decreaseProductQuantity(
    product_id: string,
    product_quantity: number,
  ): Promise<void>;
  deleteProduct(product: IProductDTO): Promise<void | null>;
}
