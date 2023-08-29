import { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";
import config from "../../../../../config/auth";
import Encript from "../../../../../services/encryption/encryption";

export default function encryptPassword(schema: Schema) {
  schema.pre("save", function (next: CallbackWithoutResultAndOptionalError) {
    for (const field of config.encriptedField) {
      if (
        this.isModified(field) &&
        typeof this[field] === "string" &&
        this[field].trim().length > 0
      ) {
        const hashedPassword = new Encript().hash(this[field]);
        this[field] = hashedPassword;
      }
    }
    next();
  });

  for (const field of config.encriptedField) {
    const methodName = `match${field.replace(/^[a-z]/, (match) =>
      match.toUpperCase()
    )}`;

    schema.methods[methodName] = function (enteredPassword: string) {
      if (typeof this[field] === "string" && this[field].trim().length > 0) {
        return new Encript().compare(enteredPassword, this[field]);
      }
      return false;
    };
  }
}
