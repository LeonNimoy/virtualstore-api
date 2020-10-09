import { ProductSchema } from '../databases/mongoose/schemas/ProductSchema';
import IProductEntity from '../entities/IProductEntity';
import IProductDTO from '../dtos/IProductDTO';
import IProductsProvider from '../providers/IProductsProvider';

export default class ProductsRepository implements IProductsProvider {
  public async find(id: string): Promise<IProductEntity> {
    const findProductId = await ProductSchema.findById(id);

    if (findProductId === null) {
      throw new Error('Product not found');
    }

    return findProductId;
  }

  public async save(productData: IProductDTO): Promise<IProductEntity> {
    const productCreated = new ProductSchema(productData);
    await productCreated.save();
    return productCreated;
  }

  public async update(newProductData: IProductDTO): Promise<IProductEntity> {
    const productUpdated = await ProductSchema.findByIdAndUpdate(
      newProductData.id,
      newProductData,
      { new: true },
    );

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
