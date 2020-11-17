import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import ProductSchema from '../infra/databases/mongoose/schemas/ProductSchema';
import Product from '../infra/databases/entities/Product';
import IProductDTO from '../dtos/IProductDTO';
import IProductsProvider from '../providers/IProductsProvider';

export default class ProductsRepository implements IProductsProvider {
  public async findProductById(product_id: string): Promise<Product | null> {
    const findProduct = await ProductSchema.findById(product_id);

    return findProduct;
  }

  public async checkExistentNameProduct(
    newProductName: string,
  ): Promise<boolean> {
    const notAvailableName = await ProductSchema.findOne({
      name: newProductName,
    });

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  public async saveProduct({
    description,
    image,
    price,
    name,
    quantity,
    tags,
  }: IProductDTO): Promise<Product> {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = utcToZonedTime(newDate, timeZone);

    const productCreated = new ProductSchema({
      description,
      image,
      name,
      price,
      quantity,
      tags,
      created_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
    });
    await productCreated.save();
    return productCreated;
  }

  public async updateProduct({
    description,
    image,
    name,
    price,
    quantity,
    tags,
    id,
  }: IProductDTO): Promise<Product | null> {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = utcToZonedTime(newDate, timeZone);

    const productUpdated = await ProductSchema.findByIdAndUpdate(
      id,
      {
        description,
        image,
        name,
        price,
        quantity,
        tags,
        updated_at: format(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
      },
      { new: true },
    );

    return productUpdated;
  }

  public async deleteProduct(product: IProductDTO): Promise<void | null> {
    await ProductSchema.findByIdAndDelete(product.id);
  }
}
