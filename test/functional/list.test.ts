describe('Products list functional tests', () => {
  it('should return the products with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/list');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        product: [
          {
            name: 'Mesa',
            tag: ['mesa', 'madeira'],
            description: 'mesa de jantar para quatro pessoas',
            value: 225.99,
            quantity: 46,
          },
        ],
      },

      {
        product: [
          {
            name: 'cadeira',
            tag: ['festa', 'cadeira'],
            description: 'cadeira de festa ultra resistente',
            value: 56.99,
            quantity: 16,
          },
        ],
      },
    ]);
  });
});
