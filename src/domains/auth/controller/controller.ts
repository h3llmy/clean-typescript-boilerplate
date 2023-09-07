import Mail from "../../../services/mailler/mailler";
import Random from "../../../services/random/random";
import AuthToken from "../../../services/authToken/jwt";
import RegistrationOtp from "../../../services/mailler/views/registrationOtp";
import ResetPassword from "../../../services/mailler/views/resetPassword";
import { IAuthToken } from "../interface/interface";
import UserService from "../../users/service/service";

class AuthController {
  public async register(req: IRequest, res: IResponse) {
    const { email, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw Exception.badRequest("password not match");
    }

    const otp = new Random().stringNumber(6);

    const checkUser = await UserService.findByEmailOrUsername(email, username);

    if (checkUser?.emailVerified) {
      throw Exception.badRequest("user already exists");
    }
    if (checkUser?.emailVerified === false) {
      await UserService.delete(checkUser);
    }

    const newUser = await UserService.create({
      email,
      username,
      password,
      otp,
      status: "user",
      emailVerified: false,
    });

    const token = AuthToken.encode(
      {
        _id: newUser._id,
        type: "register",
      } as IAuthToken,
      "10m"
    );

    new Mail()
      .to(newUser.email)
      .subject("registration otp")
      .html(RegistrationOtp, { otp });

    res.json({ token, otp });
  }

  public async resendOtp(req: IRequest, res: IResponse) {
    const { token } = req.params;
    const newOtp = new Random().stringNumber(6);

    const decodedToken = AuthToken.decode(token) as IAuthToken;
    if (decodedToken.type !== "register") {
      throw Exception.badRequest("invalid token");
    }

    const user = await UserService.findById(decodedToken._id);

    if (user.emailVerified) {
      throw Exception.badRequest("user already register");
    }

    await UserService.updateOtp(user, newOtp);

    const tokenEmail = AuthToken.encode(
      {
        _id: user._id,
        type: "register",
      } as IAuthToken,
      "10m"
    );

    new Mail()
      .to(user.email)
      .subject("registration otp")
      .html(RegistrationOtp, { otp: newOtp });

    res.json({ token: tokenEmail });
  }

  public async statusUpdate(req: IRequest, res: IResponse) {
    const { token } = req.params;
    const { otp } = req.body;

    const decodedToken = AuthToken.decode(token) as IAuthToken;
    if (decodedToken.type !== "register") {
      throw Exception.badRequest();
    }

    const user = await UserService.findOneOrFail({
      _id: decodedToken._id,
      emailVerified: false,
    });

    // await UserService.matchOtp(user, otp);

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

    await UserService.updateVerified(user);

    res.json({ message: "account sucsses to verifid" });
  }

  public async login(req: IRequest, res: IResponse) {
    const { username, password } = req.body;

    const user = await UserService.findOneOrFail({
      username,
      emailVerified: true,
    });

    UserService.matchPassword(user, password);

    const accessToken = AuthToken.encode(
      {
        _id: user._id,
        type: "login",
      } as IAuthToken,
      "30s"
    );

    const refreshToken = AuthToken.encodeRefresh(
      {
        _id: user._id,
        type: "login",
      } as IAuthToken,
      "30d"
    );

    res.json({ accessToken, refreshToken });
  }

  public async forgetPassword(req: IRequest, res: IResponse) {
    const { email, url } = req.body;
    const user = await UserService.findOneOrFail({
      email,
      emailVerified: true,
    });

    const tokenReset = AuthToken.encode(
      {
        _id: user._id,
        type: "reset password",
      } as IAuthToken,
      "10m"
    );

    new Mail()
      .to(user.email)
      .subject("reset password")
      .html(ResetPassword, { tokenReset, url });

    res.json({ message: `email sended to ${user.email}` });
  }

  public async resetPassword(req: IRequest, res: IResponse) {
    const { newPassword, confirmNewPassword } = req.body;
    const { token } = req.params;

    if (newPassword !== confirmNewPassword) {
      throw Exception.badRequest("password not match");
    }

    const decodedToken = AuthToken.decode(token) as IAuthToken;
    if (decodedToken.type !== "reset password") {
      throw Exception.unauthorized("invalid token");
    }

    const user = await UserService.findOneOrFail({
      _id: decodedToken._id,
      emailVerified: true,
    });

    await UserService.updatePassword(user, newPassword);

    res.json({ message: "password has been updated" });
  }

  public async refreshToken(req: IRequest, res: IResponse) {
    const { refreshToken } = req.body;

    const decodedToken = AuthToken.decodeRefresh(refreshToken) as IAuthToken;
    if (decodedToken.type !== "login") {
      throw Exception.unauthorized();
    }

    const user = await UserService.findById(decodedToken._id);

    const accessToken = AuthToken.encode(
      {
        _id: user._id,
        type: "login",
      } as IAuthToken,
      "30s"
    );

    const newRefreshToken = AuthToken.encodeRefresh(
      {
        _id: user._id,
        type: "login",
      } as IAuthToken,
      "30d"
    );

    res.json({ accessToken, refreshToken: newRefreshToken });
  }
}

export default AuthController;
