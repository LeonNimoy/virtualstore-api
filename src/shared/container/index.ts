import { container } from 'tsyringe';

import ProductsRepository from '../../modules/products/repositories/ProductsRepository';
import IProductsProvider from '../../modules/products/providers/IProductsProvider';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import IUsersProvider from '../../modules/users/providers/IUsersProvider';

container.registerSingleton<IProductsProvider>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersProvider>('UsersRepository', UsersRepository);
