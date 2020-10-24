import mongoose, { Document, Model } from 'mongoose';

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
