import { Schema, model } from "mongoose";
import IUsers from "../interface/users.interface";
import Validator from "../../../utils/http/validation/validator";
import softDeletePlugin from "../../../utils/database/mongoose/plugin/softDelete/softDelete";
import { ISoftDeleteModel } from "../../../utils/database/mongoose/plugin/softDelete/softDeleteModel";
import encriptPassword from "../../../utils/database/mongoose/plugin/encriptPassword/encriptPassword";
import { IEncriptPasswordModel } from "../../../utils/database/mongoose/plugin/encriptPassword/encriptPasswordModel";

const userSchema = new Schema<IUsers>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: Validator.isEmail,
        message: "invalid email format",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    otp: {
      type: String,
    },
    validator: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(encriptPassword);
userSchema.plugin(softDeletePlugin);

const Users = model<
  IUsers,
  IEncriptPasswordModel<IUsers> & ISoftDeleteModel<IUsers>
>("Users", userSchema);

export default Users;
