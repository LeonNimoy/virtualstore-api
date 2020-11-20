import mongoose, { Document, Model } from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';

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

schema.plugin(mongoosePagination);

export interface IProductModel extends Omit<Product, 'id'>, Document {}
const ProductSchema: Model<IProductModel> = mongoose.model('Product', schema);

export default ProductSchema;
