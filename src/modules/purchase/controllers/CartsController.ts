// import { container } from 'tsyringe';
// import { Request, Response } from 'express';

// import UpdateCartService from '../services/Cart/UpdateCartService';

// export default class CartsController {
//   public async update(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;

//     const createCheckout = container.resolve(CreateCheckoutService);
//     await createCheckout.execute({
//       customer_id: id,
//       prodcuts: req.body,
//     });

//     return res.status(200).json({ message: 'Compra realizada com sucesso' });
//   }
// }
