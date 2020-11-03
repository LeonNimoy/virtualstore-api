import mongoose, { Document, Model } from 'mongoose';
import { format } from 'date-fns';

import User from '../../entities/User';

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

interface IUserModel extends Omit<User, 'id'>, Document {}
export const UserSchema: Model<IUserModel> = mongoose.model('User', schema);
