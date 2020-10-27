import { format } from 'date-fns';
import { ProductSchema } from '../infra/databases/mongoose/schemas/ProductSchema';
import Product from '../infra/databases/entities/Product';
import IProductDTO from '../dtos/IProductDTO';
import IProductsProvider from '../providers/IProductsProvider';

export default class ProductsRepository implements IProductsProvider {
  public async find(): Promise<Product[] | null> {
    const products = await ProductSchema.find();

    return products;
  }

  public async findById(id: string): Promise<Product | null | undefined> {
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

  public async save(productData: IProductDTO): Promise<Product> {
    const productCreated = new ProductSchema(productData);
    await productCreated.save();
    return productCreated;
  }

  public async update({
    description,
    image,
    name,
    price,
    quantity,
    tags,
    id,
  }: IProductDTO): Promise<Product | null> {
    const productUpdated = await ProductSchema.findByIdAndUpdate(
      id,
      {
        description,
        image,
        name,
        price,
        quantity,
        tags,
        updated_at: format(new Date(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
      },
      { new: true },
    );

    return productUpdated;
  }

  public async delete(product: IProductDTO): Promise<void | null> {
    await ProductSchema.findByIdAndDelete(product.id);
  }
}
