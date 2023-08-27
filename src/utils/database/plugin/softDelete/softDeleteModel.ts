import { Document, Model, SaveOptions } from "mongoose";

export interface ISoftDeleteModel<T extends Document> extends Model<T> {
  findDeleted(): Promise<T[]>;
  restore(query: Record<string, any>): Promise<{ restored: number }>;
  softDelete(
    query: Record<string, any>,
    options?: SaveOptions
  ): Promise<{ deleted: number }>;
}
