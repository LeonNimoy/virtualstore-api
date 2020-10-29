import { Document, model, PaginateModel } from 'mongoose';

const TypedPaginateModel = <T extends Document>(name: string) =>
  model(name) as PaginateModel<T>;

export default TypedPaginateModel;
