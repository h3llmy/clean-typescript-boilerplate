import Mail from "../../../services/mailler/mailler";
import User from "../../users/model/model";
import Random from "../../../services/random/random";
import AuthToken from "../../../services/authToken/jwt";
import RegistrationOtp from "../../../services/mailler/views/registrationOtp";
import { IAuthToken } from "../interface/authTokenInterface";

class AuthController {
  public async register(req: IRequest, res: IResponse) {
    const { email, username, password } = req.body;
    const otp = new Random().otp();

    const newUser = await User.create({
      email,
      username,
      password,
      status: "user",
      otp,
      emailVerified: false,
    });

    const authToken = AuthToken.encode(
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

    res.json({ token: authToken });
  }

  public async statusUpdate(req: IRequest, res: IResponse) {
    const { token } = req.params;
    const { otp } = req.body;

    const decodedToken = AuthToken.decode(token) as IAuthToken;
    if (decodedToken.type !== "register") {
      throw Exception.badRequest();
    }

    const user = await User.findOne({
      _id: decodedToken._id,
    }).orFail(Exception.unauthorized());

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

    user.emailVerified = true;
    user.otp = undefined;
    user.validator = undefined;
    user.save();

    res.json({ user });
  }
}

export default AuthController;
