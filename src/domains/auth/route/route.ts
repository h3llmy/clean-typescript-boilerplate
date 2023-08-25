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
    this.post(
      "/test",
      this.withFile(),
      this.validator.test(),
      this.controller.test
    );
  }
}

export default AuthRoute;
