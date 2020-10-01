import mongoose, { Document, Model } from 'mongoose';

export interface IProduct {
  name: string;
  tags: [string];
  description: string;
  image: string | null;
  price: number;
  quantity: number;
}
const schema = new mongoose.Schema({
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
});

interface IProductModel extends IProduct, Document {}
export const Product: Model<IProductModel> = mongoose.model('Product', schema);
