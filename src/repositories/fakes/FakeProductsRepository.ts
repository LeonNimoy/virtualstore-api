import IProductDTO from '../../dtos/IProductDTO';
import { ProductSchema } from '../../databases/mongoose/schemas/ProductSchema';
import IProductEntity from '../../entities/IProductEntity';
import IProductProvider from '../../providers/IProductsProvider';

class FakeProductsRepository implements IProductProvider {
  private products: IProductEntity[] = [];

  public async find(id: string): Promise<IProductEntity> {
    const productId = await ProductSchema.findById(id);

    if (productId === null) {
      throw new Error('Product not found on Database');
    }

    return productId;
  }

  public async save(productData: IProductDTO): Promise<IProductEntity> {
    const product = new ProductSchema(productData);

    Object.assign(product, productData);

    this.products.push(product);
    return product;
  }

  public async update(newProductData: IProductDTO): Promise<IProductEntity> {

    if()

    if (productUpdated === null) {
      throw new Error('Product not found');
    }

    return productUpdated;
  }

  public async delete(product: IProductDTO): Promise<void> {
    const productDeleted = await ProductSchema.findByIdAndDelete(product.id);

    if (productDeleted === null) {
      throw new Error('Product not found');
    }
  }
}

export default FakeProductsRepository;
