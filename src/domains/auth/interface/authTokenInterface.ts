import { UserStatus } from "../../users/interface/interface";

export interface IAuthToken {
  _id: string;
  status: UserStatus;
  type: "login" | "register" | "resetPassword";
}
