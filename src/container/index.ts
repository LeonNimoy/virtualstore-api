import { container } from 'tsyringe';

import ProductsRepository from '../repositories/ProductsRepository';
import IProductsProvider from '../providers/IProductsProvider';

container.registerSingleton<IProductsProvider>(
  'ProductsRepository',
  ProductsRepository,
);
