import IUsers from "domains/users/interface/interface";

export default {
  permissionField: "status",
  encriptedField: ["password", "otp"],
  validationField: "validator",
} satisfies Record<string, keyof IUsers | (keyof IUsers)[]>;
