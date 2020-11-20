import IProductDTO from '../../dtos/IProductDTO';
import ProductSchema from '../../infra/databases/mongoose/schemas/ProductSchema';
import Product from '../../infra/databases/entities/Product';
import IProductProvider from '../../providers/IProductsProvider';

class FakeProductsRepository implements IProductProvider {
  private products: Product[] = [];

  public async findProductById(id: string): Promise<Product | undefined> {
    const productId = this.products.find(product => product.id === id);

    return productId;
  }

  public async checkExistentNameProduct(
    newProductName: string,
  ): Promise<boolean> {
    const notAvailableName = this.products.find(
      product => product.name === newProductName,
    );

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  public async saveProduct(productData: IProductDTO): Promise<Product> {
    const product = new ProductSchema(productData);

    Object.assign(product, productData);

    this.products.push(product);
    return product;
  }

  public async updateProduct(
    newProductData: IProductDTO,
  ): Promise<Product | null> {
    this.products.map(product => newProductData === product);

    return Object.assign(newProductData);
  }

  public async decreaseProductQuantity(
    product_id: string,
    product_quantity: number,
  ): Promise<void> {
    console.log(product_id, product_quantity);
  }

  public async deleteProduct(
    productToDelete: IProductDTO,
  ): Promise<void | null> {
    const findProduct = this.products.map(
      product => productToDelete.id === product.id,
    );

    if (findProduct) {
      this.products.splice(0, 1);
    }
  }
}

export default FakeProductsRepository;
