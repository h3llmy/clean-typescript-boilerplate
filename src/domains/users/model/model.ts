import { Model, Schema, model } from "mongoose";
import IUsers from "../interface/interface";
import encriptPassword from "../../../utils/database/plugin/encriptPassword/encriptPassword";
import Validator from "../../../utils/http/validation/validator";
import softDeletePlugin from "../../../utils/database/plugin/softDelete/softDelte";
import { ISoftDeleteModel } from "../../../utils/database/plugin/softDelete/softDeleteModel";

interface IPasswordMethod {
  matchPassword: (enteredPassword: string) => boolean;
  matchOtp: (enteredPassword: string) => boolean;
}

interface ITestModel extends Model<IUsers, {}, IPasswordMethod> {
  matchPassword: (enteredPassword: string) => boolean;
  matchOtp: (enteredPassword: string) => boolean;
}

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

const Users = model<IUsers, ITestModel>("Users", userSchema);

export default Users;