import mongoose, { Document, Model } from 'mongoose';
import { format } from 'date-fns';

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
      default: format(Date.now(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
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
