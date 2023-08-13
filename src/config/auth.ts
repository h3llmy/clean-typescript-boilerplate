import IUsers from "domains/users/interface";

type UserKeys = keyof IUsers;

export default {
  permissionField: "status",
  encriptedField: "password",
  validationField: "validator",
} satisfies Record<string, UserKeys>;
