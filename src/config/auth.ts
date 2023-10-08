import IUsers from "domains/users/interface/interface";

interface IAuthConfig {
  permissionField: string;
  encriptedField: string;
  validationField: string;
}

export default {
  permissionField: "status",
  encriptedField: ["password", "otp"],
  validationField: "validator",
} satisfies Record<keyof IAuthConfig, keyof IUsers | (keyof IUsers)[]>;
