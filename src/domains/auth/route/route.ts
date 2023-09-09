import AuthController from "../controller/controller";
import Route from "../../../utils/http/route/route";
import AuthValidator from "../validator/validator";

class AuthRoute extends Route {
  protected controller = new AuthController();
  protected validator = new AuthValidator();
  readonly prefix = "/auth";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.post("/register", this.validator.register(), this.controller.register);

    this.put("/resend-otp/:token", this.controller.resendOtp);

    this.put(
      "/update-status/:token",
      this.validator.statusUpdate(),
      this.controller.statusUpdate
    );

    this.post("/login", this.validator.login(), this.controller.login);

    this.post(
      "/forget-password",
      this.validator.forgetPassword(),
      this.controller.forgetPassword
    );

    this.put(
      "/reset-password/:token",
      this.validator.resetPassword(),
      this.controller.resetPassword
    );

    this.post(
      "/refresh-token",
      this.validator.refreshToken(),
      this.controller.refreshToken
    );

    this.get("/test", this.controller.test);
  }
}

export default AuthRoute;
