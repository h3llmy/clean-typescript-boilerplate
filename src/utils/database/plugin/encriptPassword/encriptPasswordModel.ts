import { Document, Model } from "mongoose";

export interface IEncriptPasswordModel<T extends Document> extends Model<T> {
  matchPassword(emteredEncripted: string): boolean;
  matchOtp(emteredEncripted: string): boolean;
}
