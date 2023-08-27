import { Document, Model, SaveOptions } from "mongoose";

type PartialQuery<T> = {
  [K in keyof T]?: T[K];
};

export interface ISoftDeleteModel<T extends Document> extends Model<T> {
  findDeleted(): Promise<T[]>;
  restore(query: PartialQuery<T>): Promise<{ restored: number }>;
  softDelete(
    query: PartialQuery<T>,
    options?: SaveOptions
  ): Promise<{ deleted: number }>;
}
