import { Product } from '@src/models/Product';

beforeAll(async () => Product.deleteMany({}));
describe('Product functional tests', () => {
  describe('When creating a new product', () => {
    it('should create a product with success', async () => {
      const newProduct = {
        name: 'Caneca',
        tag: ['caneca', 'geek'],
        description: 'Caneca geek do Star Wars',
        value: 56.89,
        quantity: 14,
      };

      const response = await global.testRequest
        .post('/products')
        .send(newProduct);
      expect(response.status).toBe(201);
      // Object containing matches the keys and values, even if includes other keys such as id.
      expect(response.body).toEqual(expect.objectContaining(newProduct));
    });

    it('should return 422 when there is a validation error', async () => {
      const newProduct = {
        name: 'óculos',
        tag: ['nerd', 'óculos'],
        description: 'descrição do produto',
        value: 'invalid_string',
        quantity: 17,
      };
      const response = await global.testRequest
        .post('/products')
        .send(newProduct);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Product validation failed: value: Cast to Number failed for value "invalid_string" at path "value"',
      });
    });

    it.skip('should return 500 when there is any error other than validation error', async () => {
      // TODO think in a way to throw a 500
    });

    it.skip('should return the products with just a few times', async () => {
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

      const { body, status } = await global.testRequest.get('/products');
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
});
