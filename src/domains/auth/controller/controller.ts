import Mail from "../../../services/mailler/mailler";
import User from "../../users/model/model";
import Random from "../../../services/random/random";
import Home from "../../../views/index";

class AuthController {
  public async register(req: IRequest, res: IResponse) {
    const otp = Random.otp();

    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      status: "user",
      otp: otp,
      emailVerified: false,
    });

    new Mail()
      .to(newUser.email)
      .subject("registration otp")
      .html(Home, { name: "mantap jiwa" });

    res.json({
      register: newUser,
    });
  }

  public async test(req: IRequest, res: IResponse) {
    res.view(Home, { name: "helmi" });
  }
}

export default AuthController;
