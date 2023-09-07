import { Document, FilterQuery, Model, SaveOptions } from "mongoose";

export interface ISoftDeleteModel<T extends Document> extends Model<T> {
  findDeleted(query?: FilterQuery<T>): Promise<T[]>;
  restore(query: FilterQuery<T>): Promise<{ restored: number }>;
  softDelete(
    query: FilterQuery<T>,
    options?: SaveOptions
  ): Promise<{ deleted: number }>;
}
