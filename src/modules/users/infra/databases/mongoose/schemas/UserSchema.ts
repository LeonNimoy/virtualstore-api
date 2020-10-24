import mongoose, { Document, Model } from 'mongoose';

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

    addresses: [
      {
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
    ],

    payment: [
      {
        card_number: {
          type: Number,
        },
        expire_date: {
          type: Date,
        },
        security_code: {
          type: Number,
        },
        owner_name: {
          type: String,
        },
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

interface IUserModel extends Omit<User, 'id'>, Document {}
export const UserSchema: Model<IUserModel> = mongoose.model('User', schema);
