import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
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
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Products = mongoose.model('Product', ProductSchema);

export default Products;
