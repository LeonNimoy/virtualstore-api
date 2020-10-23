import mongoose, { Document, Model } from 'mongoose';

import IAddressEntity from '../../../../entities/IAddressEntity';
// import UserSchema from './UserSchema';

const schema = new mongoose.Schema(
  {
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
      },
    ],

    cep: {
      type: String,
    },
    address: {
      type: String,
    },
    address_2: {
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
  },

  {
    timestamps: { createdAt: 'created_at' },
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

interface IAddressModel extends Omit<IAddressEntity, 'id'>, Document {}
export const AddressSchema: Model<IAddressModel> = mongoose.model(
  'Address',
  schema,
);
