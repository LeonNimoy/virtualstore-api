/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose, { Document, Model } from 'mongoose';

import IProductEntity from '../../../entities/IProductEntity';

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

interface IProductModel extends Omit<IProductEntity, '_id'>, Document {}
export const ProductSchema: Model<IProductModel> = mongoose.model(
  'Product',
  schema,
);
