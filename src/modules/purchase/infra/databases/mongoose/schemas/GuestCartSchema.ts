import mongoose, { Document, Model } from 'mongoose';

import GuestCart from '../../entities/GuestCart';

const schema = new mongoose.Schema(
  {
    guestToken: {
      type: String,
      unique: true,
      required: true,
    },
    products: [
      {
        id: String,
        title: String,
        unit_price: Number,
        quantity: Number,
        tangible: Boolean,
        image: String,
      },
    ],
    status: {
      type: String,
    },
    created_at: {
      type: String,
    },
    updated_at: {
      type: String,
    },
    expire_at: {
      type: Date,
      default: Date.now,
      expires: 432000,
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

export interface ICartModel extends Omit<GuestCart, 'id'>, Document {}
const GuestCartSchema: Model<ICartModel> = mongoose.model('GuestCart', schema);

export default GuestCartSchema;
