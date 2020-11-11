"use strict";

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _DeleteProductService = _interopRequireDefault(require("./DeleteProductService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DeleteProduct', () => {
  it('should be able to delete a product', async () => {
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
    const deleteProduct = new _DeleteProductService.default(fakeProductRepository);
    expect(await deleteProduct.execute({
      id: product.id
    })).toBe(undefined);
  });
  it("should not be able to delete a product that doesn't exist", async () => {
    const fakeProductRepository = new _FakeProductsRepository.default();
    const deleteProduct = new _DeleteProductService.default(fakeProductRepository);
    expect(deleteProduct.execute({
      id: undefined
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});