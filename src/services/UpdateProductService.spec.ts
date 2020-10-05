import UpdateProductService from './UpdateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

describe('CreateProduct', () => {
  it('should be able to update a product', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const product = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const newProductData = {
      name: 'New Name',
    };
    const productUpdated = await updateProduct.execute({product.__id, new});

    expect(productUpdated).toEqual(expect.objectContaining(product));
  });
});
