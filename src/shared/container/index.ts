import { container } from 'tsyringe';

import ProductsRepository from '../../modules/products/repositories/ProductsRepository';
import IProductsProvider from '../../modules/products/providers/IProductsProvider';

container.registerSingleton<IProductsProvider>(
  'ProductsRepository',
  ProductsRepository,
);
