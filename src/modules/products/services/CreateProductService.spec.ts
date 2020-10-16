import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import AppError from '../../../shared/errors/AppError';

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
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

  it('should not be able to create a new product with the same name of an old product', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    expect(
      createProductService.execute({
        name: 'Product Test',
        tags: ['Product', 'Test'],
        description: 'Just a simple test.',
        image: 'www.test.com',
        price: 46.89,
        quantity: 4,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
