import mongoose, { Document, Model } from 'mongoose';

import Checkout from '../../entities/Checkout';

const schema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    cardId: {
      type: String,
    },
    productsId: {
      type: [String],
    },
    addressId: {
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

export interface ICheckoutModel extends Omit<Checkout, 'id'>, Document {}
const CheckoutSchema: Model<ICheckoutModel> = mongoose.model(
  'Checkout',
  schema,
);

export default CheckoutSchema;
