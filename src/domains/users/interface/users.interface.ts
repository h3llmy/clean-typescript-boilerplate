import { Document } from "mongoose";

export type UserStatus = "user" | "admin";

export default interface IUsers extends Document {
  email: string;
  username: string;
  password: string;
  status: UserStatus;
  emailVerified: boolean;
  otp?: string;
  validator?: number;
}
