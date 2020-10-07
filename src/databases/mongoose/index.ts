import mongoose, { Mongoose } from 'mongoose';

mongoose.set('runValidators', true);

export const connect = async (): Promise<Mongoose> =>
  mongoose.connect(process.env.MONGODB_URL!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

export const close = (): Promise<void> => mongoose.connection.close();
