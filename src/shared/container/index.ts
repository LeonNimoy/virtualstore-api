import { container } from 'tsyringe';

import '../../modules/users/providers';

import IStorageProvider from './providers/StorageProvider/entities/IStorageProvider';
import S3StorageProvider from './providers/StorageProvider/implementations/S3StorageProvider';

import ProductsRepository from '../../modules/products/repositories/ProductsRepository';
import IProductsProvider from '../../modules/products/providers/IProductsProvider';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import IUsersProvider from '../../modules/users/providers/IUsersProvider';

import ProfileRepository from '../../modules/users/repositories/ProfileRepository';
import IProfileProvider from '../../modules/users/providers/IProfileProvider';

container.registerSingleton<IProductsProvider>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersProvider>('UsersRepository', UsersRepository);

container.registerSingleton<IProfileProvider>(
  'ProfileRepository',
  ProfileRepository,
);

container.registerSingleton<IStorageProvider>(
  'S3StorageProvider',
  S3StorageProvider,
);
