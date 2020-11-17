import mongoose, { Document, Model } from 'mongoose';

import Address from '../../entities/Address';

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
    },

    address: {
      type: String,
    },

    address_number: {
      type: Number,
    },
    address_complement: {
      type: String,
    },
    neighborhood: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
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

interface IAddressModel extends Omit<Address, 'id'>, Document {}
export const AddressSchema: Model<IAddressModel> = mongoose.model(
  'Address',
  schema,
);
