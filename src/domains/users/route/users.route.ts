import UserController from "../controller/users.controller";
import Route from "../../../utils/http/route/route";
import UserValidator from "../validator/users.validator";

class UserRoute extends Route {
  protected controller = new UserController();
  protected validator = new UserValidator();
  readonly prefix = "/users";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.get("/", this.permission("authenticated"), this.controller.detail);

    this.put("/", this.permission("authenticated"), this.controller.update);

    this.get(
      "/list",
      this.permission("admin"),
      this.validator.list(),
      this.controller.list
    );
  }
}

export default UserRoute;
