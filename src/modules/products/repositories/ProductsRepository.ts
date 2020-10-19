import { ProductSchema } from '../databases/mongoose/schemas/ProductSchema';
import IProductEntity from '../entities/IProductEntity';
import IProductDTO from '../dtos/IProductDTO';
import IProductsProvider from '../providers/IProductsProvider';

export default class ProductsRepository implements IProductsProvider {
  public async find(): Promise<IProductEntity[] | null> {
    const products = await ProductSchema.find();

    return products;
  }

  public async findById(
    id: string,
  ): Promise<IProductEntity | null | undefined> {
    const findProductId = await ProductSchema.findById(id);

    return findProductId;
  }

  public async checkName(newProductName: string): Promise<boolean> {
    const notAvailableName = await ProductSchema.findOne({
      name: newProductName,
    });

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  public async save(productData: IProductDTO): Promise<IProductEntity> {
    const productCreated = new ProductSchema(productData);
    await productCreated.save();
    return productCreated;
  }

  public async update(
    newProductData: IProductDTO,
  ): Promise<IProductEntity | null> {
    const productUpdated = await ProductSchema.findByIdAndUpdate(
      newProductData.id,
      newProductData,
      { new: true },
    );

    return productUpdated;
  }

  public async delete(product: IProductDTO): Promise<void | null> {
    await ProductSchema.findByIdAndDelete(product.id);
  }
}
