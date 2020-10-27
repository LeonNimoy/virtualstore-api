import mongoose, { Document, Model } from 'mongoose';
import { format } from 'date-fns';

import Product from '../../entities/Product';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    tags: {
      type: [String],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Minimum of one unit'],
    },
    created_at: {
      type: String,
      default: format(Date.now(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
    },
    updated_at: {
      type: String,
      default: format(new Date(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
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

interface IProductModel extends Omit<Product, 'id'>, Document {}
export const ProductSchema: Model<IProductModel> = mongoose.model(
  'Product',
  schema,
);
