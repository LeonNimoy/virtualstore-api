import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';
import AppError from '../../../shared/errors/AppError';

describe('DeleteProduct', () => {
  it('should be able to delete a product', async () => {
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

    const deleteProduct = new DeleteProductService(fakeProductRepository);

    expect(
      await deleteProduct.execute({
        id: product.id,
      }),
    ).toBe(undefined);
  });

  it("should not be able to delete a product that doesn't exist", async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const deleteProduct = new DeleteProductService(fakeProductRepository);

    expect(
      deleteProduct.execute({
        id: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
