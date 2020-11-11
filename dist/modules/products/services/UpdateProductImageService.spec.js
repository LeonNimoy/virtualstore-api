"use strict";

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _UpdateProductImageService = _interopRequireDefault(require("./UpdateProductImageService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateProductImage', () => {
  it('should be able to save a product image', async () => {
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const updateProductService = new _UpdateProductImageService.default(fakeStorageProvider);
    const productImage = await updateProductService.execute({
      imageFilename: 'test.jpg'
    });
    expect(productImage).toEqual('https://undefined.s3.amazonaws.com/test.jpg');
  });
  it('should not be able to save an undefined image', async () => {
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const updateProductService = new _UpdateProductImageService.default(fakeStorageProvider);
    expect(updateProductService.execute({
      imageFilename: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});