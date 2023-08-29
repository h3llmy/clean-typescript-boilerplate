import { Document, Model, SaveOptions } from "mongoose";

type ComparisonOperators<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
};

type LogicalOperators<T> = {
  $and?: Array<PartialQuery<T>>;
  $or?: Array<PartialQuery<T>>;
  $not?: PartialQuery<T>;
};

type QueryOperators<T> = ComparisonOperators<T> & LogicalOperators<T>;

type PartialQuery<T> = {
  [K in keyof T]?: T[K] | QueryOperators<T[K] | undefined>;
};

export interface ISoftDeleteModel<T extends Document> extends Model<T> {
  findDeleted(query?: PartialQuery<T>): Promise<T[]>;
  restore(query: PartialQuery<T>): Promise<{ restored: number }>;
  softDelete(
    query: PartialQuery<T>,
    options?: SaveOptions
  ): Promise<{ deleted: number }>;
}
