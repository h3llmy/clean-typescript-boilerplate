import { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";
import config from "../../../../config/auth";
import Encript from "../../../../services/encryption/encryption";

export default function encriptPassword(schema: Schema) {
  schema.pre(
    "save",
    async function (next: CallbackWithoutResultAndOptionalError) {
      for (const field of config.encriptedField) {
        if (this.isModified(field)) {
          const hashedPassword = await Encript.hash(this[field]);
          this[field] = hashedPassword;
        }
      }
      next();
    }
  );

  for (const field of config.encriptedField) {
    const methodName = `match${field.replace(/^[a-z]/, (match) =>
      match.toUpperCase()
    )}`;

    schema.methods[methodName] = function (enteredPassword: string) {
      return Encript.compare(enteredPassword, this[field]);
    };
  }
}
