import { container } from 'tsyringe';

import '../../modules/users/providers';

import CheckoutsRepository from '@modules/purchase/repositories/CheckoutsRepository';
import ICheckoutProvider from '@modules/purchase/providers/ICheckoutProvider';

import IPaymentProvider from '@modules/purchase/providers/PaymentProvider/entities/IPaymentProvider';
import PagarmeProvider from '@modules/purchase/providers/PaymentProvider/implementations/PagarmeProvider';

import IStorageProvider from './providers/StorageProvider/entities/IStorageProvider';
import S3StorageProvider from './providers/StorageProvider/implementations/S3StorageProvider';

import ProductsRepository from '../../modules/products/repositories/ProductsRepository';
import IProductsProvider from '../../modules/products/providers/IProductsProvider';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import IUsersProvider from '../../modules/users/providers/IUsersProvider';

import AddressesRepository from '../../modules/users/repositories/AddressesRepository';
import IAddressesProvider from '../../modules/users/providers/IAddressesProvider';

container.registerSingleton<IProductsProvider>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersProvider>('UsersRepository', UsersRepository);

container.registerSingleton<IAddressesProvider>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IStorageProvider>(
  'S3StorageProvider',
  S3StorageProvider,
);

container.registerSingleton<IPaymentProvider>(
  'PagarmeProvider',
  PagarmeProvider,
);

container.registerSingleton<ICheckoutProvider>(
  'CheckoutsRepository',
  CheckoutsRepository,
);
