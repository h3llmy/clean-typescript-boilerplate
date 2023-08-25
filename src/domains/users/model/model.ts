import { Schema, model } from "mongoose";
import IUsers from "../interface/interface";
import encriptPassword from "../../../utils/database/plugin/encriptPassword/encriptPassword";
import Validator from "../../../utils/http/validation/validator";

const userSchema = new Schema<IUsers>({
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
});

userSchema.plugin(encriptPassword);

const Users = model<IUsers>("Users", userSchema);

export default Users;
