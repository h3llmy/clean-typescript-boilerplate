import { UserStatus } from "../../users/interface/users.interface";

export interface IAuthToken {
  _id: string;
  status: UserStatus;
  type: "login" | "register" | "reset password";
}
