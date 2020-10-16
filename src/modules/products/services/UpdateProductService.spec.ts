import UpdateProductService from './UpdateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import AppError from '../../../shared/errors/AppError';

describe('UpdateProduct', () => {
  it('should be able to update a product', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: 'New Name',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    expect(productUpdated).toEqual(expect.objectContaining(productUpdated));
  });

  it("should not be able to update a product that doesn't exist", async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const updateProduct = new UpdateProductService(fakeProductRepository);

    expect(
      updateProduct.execute({
        id: undefined,
        name: 'New Name',
        tags: ['Product', 'Test'],
        description: 'Just a simple test.',
        image: 'www.test.com',
        price: 46.89,
        quantity: 4,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able o change the property name if input is empty', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: '',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    expect(productUpdated.name).toEqual('Product Test');
  });

  it('should not be able o change the property tags if input is empty', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: 'Product Test',
      tags: [],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    expect(Array.from(productUpdated.tags)).toEqual(['Product', 'Test']);
  });

  it('should not be able o change the property description if input is empty', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: '',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    expect(productUpdated.description).toEqual('Just a simple test.');
  });

  it('should not be able o change the property image if input is empty', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: '',
      image: '',
      price: 46.89,
      quantity: 4,
    });

    expect(productUpdated.image).toEqual('www.test.com');
  });

  it('should not be able o change the property price if input is empty', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: '',
      image: '',
      price: 0,
      quantity: 4,
    });

    expect(productUpdated.price).toEqual(46.89);
  });

  it('should not be able o change the property quantity if input is empty', async () => {
    const fakeProductRepository = new FakeProductsRepository();

    const createProductService = new CreateProductService(
      fakeProductRepository,
    );
    const oldUserData = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4,
    });

    const updateProduct = new UpdateProductService(fakeProductRepository);

    const productUpdated = await updateProduct.execute({
      id: oldUserData.id,
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: '',
      image: '',
      price: 46.89,
      quantity: 0,
    });

    expect(productUpdated.quantity).toEqual(4);
  });
});
