import IUsers from "domains/users/interface/interface";

interface IAuthConfig {
  permissionField: keyof IUsers;
  encriptedField: (keyof IUsers)[];
  validationField: keyof IUsers;
}

export default {
  permissionField: "status",
  encriptedField: ["password", "otp"],
  validationField: "validator",
} satisfies IAuthConfig;
