/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose, { Document, Model } from 'mongoose';

import IUserEntity from '../../../entities/IUserEntity';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    cpf: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
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

interface IUserModel extends Omit<IUserEntity, '_id'>, Document {}
export const UserSchema: Model<IUserModel> = mongoose.model('User', schema);
