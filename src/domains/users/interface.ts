export type UserStatus = "user" | "admin";

export default interface IUsers {
  email: string;
  username: string;
  password: string;
  status: UserStatus;
  emailVerified: boolean;
  validator: number;
}
