import { container } from 'tsyringe';

import '../../modules/users/providers';

// import CheckoutsRepository from '@modules/purchase/repositories/CheckoutsRepository';
// import ICheckoutProvider from '@modules/purchase/providers/ICheckoutProvider';

import CartsRepository from '@modules/purchase/repositories/CartsRepository';
import ICartProvider from '@modules/purchase/providers/ICartProvider';

import IPaymentProvider from '@modules/purchase/providers/PaymentProvider/entities/IPaymentProvider';
import PagarmeProvider from '@modules/purchase/providers/PaymentProvider/implementations/PagarmeProvider';

import ProductsRepository from '@modules/products/repositories/ProductsRepository';
import IProductsProvider from '@modules/products/providers/IProductsProvider';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import IUsersProvider from '@modules/users/providers/IUsersProvider';

import AddressesRepository from '@modules/users/repositories/AddressesRepository';
import IAddressesProvider from '@modules/users/providers/IAddressesProvider';

import ITransactionProvider from '@modules/purchase/providers/ITransactionProvider';
import TransactionsRepository from '@modules/purchase/repositories/TransactionsRepository';

import S3StorageProvider from './providers/StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from './providers/StorageProvider/entities/IStorageProvider';

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

container.registerSingleton<ICartProvider>('CartsRepository', CartsRepository);

container.registerSingleton<ITransactionProvider>(
  'TransactionsRepository',
  TransactionsRepository,
);
