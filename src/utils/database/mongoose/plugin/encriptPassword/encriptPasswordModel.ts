import { Document, Model } from "mongoose";
import config from "../../../../../config/auth";

const EncriptPassword = config.encriptedField;

type EncriptPasswordType = (typeof EncriptPassword)[number];

type IEncriptPasswordMethods = {
  [K in EncriptPasswordType as `match${Capitalize<K>}`]: (
    enteredPassword: string
  ) => boolean;
};

export interface IEncriptPasswordModel<T extends Document>
  extends Model<T, {}, IEncriptPasswordMethods> {}
