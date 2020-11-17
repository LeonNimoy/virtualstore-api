import mongoose, { Document, Model } from 'mongoose';

import Cart from '../../entities/Cart';

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    products: [String],

    status: {
      type: String,
    },
    created_at: {
      type: String,
    },
    updated_at: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export interface ICartModel extends Omit<Cart, 'id'>, Document {}
const CartSchema: Model<ICartModel> = mongoose.model('Cart', schema);

export default CartSchema;
