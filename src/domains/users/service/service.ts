import { FilterQuery } from "mongoose";
import IUsers from "../interface/interface";
import Users from "../model/model";

class UserService {
  static async create(userPayload: any) {
    return await Users.create(userPayload);
  }

  static async findByEmailOrUsername(email: string, username: string) {
    return await Users.findOne({
      $or: [{ email }, { username }],
    }).select("-password -otp");
  }

  static async findById(id: string, message?: string) {
    return await Users.findById(id.toString())
      .orFail(Exception.unauthorized(message || "user not found"))
      .select("-password -otp");
  }

  static async findOne(userPayload: FilterQuery<IUsers>) {
    return Users.findOne(userPayload).select("-password -otp");
  }

  static async findOneOrFail(
    userPayload: FilterQuery<IUsers>,
    message?: string
  ) {
    return Users.findOne(userPayload)
      .select("-password -otp")
      .orFail(Exception.unauthorized(message || "user not found"));
  }

  static async findAndPaginate(
    page: number = 1,
    limit: number = 10,
    filter?: FilterQuery<IUsers>
  ) {
    return await Users.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password -otp");
  }

  static async countPage(limit: number = 10, filter?: FilterQuery<IUsers>) {
    return Math.ceil((await Users.countDocuments(filter)) / limit) || 1;
  }

  static async findByIdAndUpdate(id: string, userPayload: Partial<IUsers>) {
    return await Users.findByIdAndUpdate(
      id,
      { $set: userPayload },
      { new: true }
    );
  }

  static async updateOtp(id: string, otp: string) {
    const user = await Users.findById(id)
      .select("-password")
      .orFail(Exception.unauthorized("user not found"));
    user.otp = otp;
    user.save();
    return user;
  }

  static async updatePassword(filter: FilterQuery<IUsers>, password: string) {
    const user = await Users.findOne(filter)
      .select("-otp")
      .orFail(Exception.unauthorized("user not found"));
    user.password = password;
    user.save();
    return user;
  }

  static async updateVerified(user: IUsers) {
    return await Users.findByIdAndUpdate(
      user._id,
      {
        $set: {
          emailVerified: true,
        },
        $unset: {
          otp: 1,
          validator: 1,
        },
      },
      { new: true }
    );
  }

  static async matchOtp(filter: FilterQuery<IUsers>, otp: string) {
    const user = await Users.findOne(filter)
      .select("-password")
      .orFail(Exception.unauthorized("user not found"));
    if (!user.matchOtp(otp)) {
      user.validator++;
      if (user.validator >= 3) {
        user.deleteOne();
        throw Exception.badRequest("invalid otp", {
          body: { otp: "you enter an invalid otp 3 times" },
        });
      }
      await user.save();
      throw Exception.badRequest("invalid otp", {
        body: { otp: "otp not match! please try again" },
      });
    }
    return user;
  }

  static async matchPassword(filter: FilterQuery<IUsers>, password: string) {
    const user = await Users.findOne(filter)
      .select("-otp")
      .orFail(Exception.unauthorized("user not found"));
    if (!user.matchPassword(password)) {
      throw Exception.unauthorized();
    }
    return user;
  }

  static async delete(user: IUsers) {
    return await Users.deleteMany({ _id: user._id });
  }
}

export default UserService;
