import AuthController from "../controller/controller";
import Route from "../../../utils/http/route/route";

class AuthRoute extends Route {
  protected controller = new AuthController();
  readonly prefix = "/auth";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.get(
      "/register",
      // this.withFile(),
      // this.permission("authenticated"),
      this.controller.register
    );
  }
}

export default AuthRoute;
