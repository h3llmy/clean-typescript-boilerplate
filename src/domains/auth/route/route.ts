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
    this.get(
      "/register",
      this.validator.register(),
      this.withFile(),
      // this.permission("authenticated"),
      this.controller.register
    );
  }
}

export default AuthRoute;
