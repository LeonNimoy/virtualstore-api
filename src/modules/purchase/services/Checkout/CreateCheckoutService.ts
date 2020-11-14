// import 'reflect-metadata';
// import { inject, injectable } from 'tsyringe';

// import IProductsProvider from '@modules/products/providers/IProductsProvider';
// import IAddressesProvider from '@modules/users/providers/IAddressesProvider';
// import IUsersProvider from '@modules/users/providers/IUsersProvider';
// import AppError from '@shared/errors/AppError';
// import IPaymentProvider from '../providers/PaymentProvider/entities/IPaymentProvider';
// import ICheckoutDTO from '../dtos/ICheckoutDTO';

// @injectable()
// class CreateCheckoutService {
//   constructor(
//     @inject('PagarmeProvider')
//     private pagarmeProvider: IPaymentProvider,

//     @inject('UsersRepository')
//     private userRepository: IUsersProvider,

//     @inject('AddressesRepository')
//     private addressRepository: IAddressesProvider,

//     @inject('ProductsRepository')
//     private productRepository: IProductsProvider,
//   ) {}

//   public async execute({
//     address_id,
//     purchaseAmount,
//     cardHash,
//     customer_id,
//     product_id,
//   }: ICheckoutDTO): Promise<void> {
//     const userData = await this.userRepository.findById(customer_id);

//     switch (userData) {
//       case null:
//         throw new AppError(
//           'Usuário não identificado para realizar a compra',
//           404,
//         );
//       case undefined:
//         throw new AppError('Usuário inválido para realizar a compra', 400);
//       default:
//     }

//     const addressData = await this.addressRepository.findAddressById(
//       address_id,
//     );

//     switch (addressData) {
//       case null:
//         throw new AppError(
//           'Endereço não identificado para realizar a compra',
//           404,
//         );
//       case undefined:
//         throw new AppError('Endereço inválido para realizar a compra', 400);
//       default:
//     }

//     const productData = await this.productRepository.findById(product_id);

//     switch (productData) {
//       case null:
//         throw new AppError(
//           'Produto não identificado para realizar a compra',
//           404,
//         );
//       case undefined:
//         throw new AppError('Produto inválido para realizar a compra', 400);
//       default:
//     }

//     if (purchaseAmount === undefined)
//       throw new AppError('Valor da compra inválido', 400);

//     if (purchaseAmount <= 0)
//       throw new AppError('Valor da compra inválido', 403);

//     await this.pagarmeProvider.createTransaction({
//       amount: purchaseAmount * 100,
//       cardHash,
//       userData,
//       addressData,
//       productData,
//     });
//   }
// }

// export default CreateCheckoutService;
