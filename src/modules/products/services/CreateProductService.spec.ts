import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

describe('CreateProduct', () => {
  it.skip('should be able to create a new product', async () => {
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
    expect(product).toEqual(expect.objectContaining(product));
  });
});
