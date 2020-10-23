import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateProductImageService from './UpdateProductImageService';
import AppError from '../../../shared/errors/AppError';

describe('UpdateProductImage', () => {
  it('should be able to save a product image', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const updateProductService = new UpdateProductImageService(
      fakeStorageProvider,
    );

    const productImage = await updateProductService.execute({
      imageFilename: 'test.jpg',
    });

    expect(productImage).toEqual('https://undefined.s3.amazonaws.com/test.jpg');
  });

  it('should not be able to save an undefined image', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const updateProductService = new UpdateProductImageService(
      fakeStorageProvider,
    );

    expect(
      updateProductService.execute({
        imageFilename: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
