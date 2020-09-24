/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose, { Document, Model } from 'mongoose';

export interface Product {
  _id?: string;
  name: string;
  tag: [string];
  description: number;
  value: number;
  quantity: number;
}
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    tag: {
      type: [String],
    },
    description: {
      type: String,
    },
    value: {
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

interface ProductModel extends Omit<Product, '_id'>, Document {}
export const Product: Model<ProductModel> = mongoose.model('Product', schema);
