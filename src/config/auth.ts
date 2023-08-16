import IUsers from "domains/users/interface/interface";

export default {
  permissionField: "status",
  encriptedField: "password",
  validationField: "validator",
} satisfies Record<string, keyof IUsers>;
