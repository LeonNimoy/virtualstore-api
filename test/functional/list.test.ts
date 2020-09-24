import { Product } from '@src/models/Product';

describe('Products list functional tests', () => {
  beforeEach(async () => {
    await Product.deleteMany({});
    const defaultProduct = {
      name: 'Fantasia Homem-Aranha',
      tag: ['aranha', 'fatasia'],
      description: 'Um grande fatasia',
      value: 65.87,
      quantity: 6,
    };
    const product = new Product(defaultProduct);
    await product.save();
  });
  it('should return the products with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/list');
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining([
        {
          name: 'Fantasia Homem-Aranha',
          tag: ['aranha', 'fatasia'],
          description: 'Um grande fatasia',
          value: 65.87,
          quantity: 6,
        },
      ]),
    );
  });
});
