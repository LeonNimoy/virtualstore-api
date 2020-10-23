import mongoose, { Document, Model } from 'mongoose';

import IUserEntity from '../../../../entities/IUserEntity';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    cpf: {
      type: Number,
    },

    addresses_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddressSchema',
      },
    ],
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

interface IUserModel extends Omit<IUserEntity, 'id'>, Document {}
export const UserSchema: Model<IUserModel> = mongoose.model('User', schema);
