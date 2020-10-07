import mongoose, { Document, Model } from 'mongoose';

import IUserEntity from '../../entities/IUserEntity';

const schema = new mongoose.Schema({
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
    type: Number,
    required: true,
  },
});

interface IUserModel extends IUserEntity, Document {}
export const UserSchema: Model<IUserModel> = mongoose.model('User', schema);
