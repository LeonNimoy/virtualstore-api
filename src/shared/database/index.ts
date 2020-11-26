import mongoose, { Mongoose } from 'mongoose';

mongoose.set('runValidators', true);

// production: MONGODB_URL - test: MONGODB_TEST
export const connect = async (): Promise<Mongoose> =>
  mongoose.connect(process.env.mongodb_url!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

export const close = (): Promise<void> => mongoose.connection.close();
