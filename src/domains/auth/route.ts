import AuthController from "./controller";
import Route from "../../utils/http/route/route";

class AuthRoute extends Route {
  protected controller = new AuthController();
  readonly prefix = "/auth";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.get("/register", this.permission(["admin"]), this.controller.register);
  }
}

export default AuthRoute;
