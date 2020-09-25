/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose, { Document, Model } from 'mongoose';

export interface Product {
  _id?: string;
  name: string;
  tags: [string];
  description: number;
  image: string;
  price: number;
  quantity: number;
}
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

interface ProductModel extends Omit<Product, '_id'>, Document {}
export const Product: Model<ProductModel> = mongoose.model('Product', schema);
