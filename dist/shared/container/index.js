"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _PagarmeProvider = _interopRequireDefault(require("../../modules/purchase/providers/PaymentProvider/implementations/PagarmeProvider"));

var _ProductsRepository = _interopRequireDefault(require("../../modules/products/repositories/ProductsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/repositories/UsersRepository"));

var _AddressesRepository = _interopRequireDefault(require("../../modules/users/repositories/AddressesRepository"));

var _S3StorageProvider = _interopRequireDefault(require("./providers/StorageProvider/implementations/S3StorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('ProductsRepository', _ProductsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('AddressesRepository', _AddressesRepository.default);

_tsyringe.container.registerSingleton('S3StorageProvider', _S3StorageProvider.default);

_tsyringe.container.registerSingleton('PagarmeProvider', _PagarmeProvider.default); // container.registerSingleton<ICheckoutProvider>(
//   'CheckoutsRepository',
//   CheckoutsRepository,
// );