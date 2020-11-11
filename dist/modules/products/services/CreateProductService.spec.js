"use strict";

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
    const fakeProductRepository = new _FakeProductsRepository.default();
    const createProductService = new _CreateProductService.default(fakeProductRepository);
    const product = await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4
    });
    expect(product).toEqual(expect.objectContaining(product));
  });
  it('should not be able to create a new product with the same name of an another product', async () => {
    const fakeProductRepository = new _FakeProductsRepository.default();
    const createProductService = new _CreateProductService.default(fakeProductRepository);
    await createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4
    });
    expect(createProductService.execute({
      name: 'Product Test',
      tags: ['Product', 'Test'],
      description: 'Just a simple test.',
      image: 'www.test.com',
      price: 46.89,
      quantity: 4
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});