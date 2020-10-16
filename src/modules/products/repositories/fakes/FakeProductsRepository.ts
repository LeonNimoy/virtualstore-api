import IProductDTO from '../../dtos/IProductDTO';
import { ProductSchema } from '../../databases/mongoose/schemas/ProductSchema';
import IProductEntity from '../../entities/IProductEntity';
import IProductProvider from '../../providers/IProductsProvider';
import AppError from '../../../../shared/errors/AppError';

class FakeProductsRepository implements IProductProvider {
  private products: IProductEntity[] = [];

  public async find(): Promise<IProductEntity[]> {
    const products = await ProductSchema.find();

    if (products === null) {
      throw new AppError('Products not found!', 404);
    }
    return products;
  }

  public async findById(id: string): Promise<IProductEntity> {
    const productId = await ProductSchema.findById(id);

    if (productId === null) {
      throw new Error('Product not found on Database');
    }

    return productId;
  }

  public async checkName(newProductName: string): Promise<boolean> {
    const notAvailableName = this.products.find(
      product => product.name === newProductName,
    );

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  public async save(productData: IProductDTO): Promise<IProductEntity> {
    const product = new ProductSchema(productData);

    Object.assign(product, productData);

    this.products.push(product);
    return product;
  }

  public async update(newProductData: IProductDTO): Promise<IProductEntity> {
    // if()

    // if (productUpdated === null) {
    //   throw new Error('Product not found');
    // }

    return newProductData;
  }

  public async delete(product: IProductDTO): Promise<void> {
    const productDeleted = await ProductSchema.findByIdAndDelete(product.id);

    if (productDeleted === null) {
      throw new Error('Product not found');
    }
  }
}

export default FakeProductsRepository;
