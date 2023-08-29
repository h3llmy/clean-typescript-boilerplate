import UserController from "../controller/controller";
import Route from "../../../utils/http/route/route";
import UserValidator from "../validator/validator";

class UserRoute extends Route {
  protected controller = new UserController();
  protected validator = new UserValidator();
  readonly prefix = "/user";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.get("/", this.permission("authenticated"), this.controller.detail);
    this.put("/", this.permission("authenticated"), this.controller.update);
    this.get("/list", this.permission("admin"), this.controller.list);
    this.post(
      "/test",
      this.withFile(),
      this.validator.test(),
      this.controller.test
    );
  }
}

export default UserRoute;
