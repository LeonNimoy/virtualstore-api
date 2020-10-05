import mongoose, { Document, Model } from 'mongoose';
import IProductEntity from '../../../entities/IProductEntity';

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

interface IProductModel extends IProductEntity, Document {}
export const ProductSchema: Model<IProductModel> = mongoose.model(
  'Product',
  schema,
);
