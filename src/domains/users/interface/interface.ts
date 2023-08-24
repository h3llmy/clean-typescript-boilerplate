export type UserStatus = "user" | "admin";

export default interface IUsers {
  _id: string;
  email: string;
  username: string;
  password: string;
  status: UserStatus;
  emailVerified: boolean;
  otp?: string;
  validator?: number;
}
