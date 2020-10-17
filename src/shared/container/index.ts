import { container } from 'tsyringe';

import '../../modules/users/providers';

import IStorageProvider from './entities/IStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

import ProductsRepository from '../../modules/products/repositories/ProductsRepository';
import IProductsProvider from '../../modules/products/providers/IProductsProvider';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import IUsersProvider from '../../modules/users/providers/IUsersProvider';

container.registerSingleton<IProductsProvider>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersProvider>('UsersRepository', UsersRepository);

container.registerSingleton<IStorageProvider>(
  'S3StorageProvider',
  S3StorageProvider,
);
