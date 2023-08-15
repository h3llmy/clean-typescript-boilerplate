import IUsers from "domains/users/interface";

export default {
  permissionField: "status",
  encriptedField: "password",
  validationField: "validator",
} satisfies Record<string, keyof IUsers>;
