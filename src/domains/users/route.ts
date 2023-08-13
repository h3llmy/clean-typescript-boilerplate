import UserController from "./controller";
import Route from "../../utils/http/route/route";

class UserRoute extends Route {
  protected controller = new UserController();
  readonly prefix = "/user";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.get("/", this.middleware("isLogin"), this.controller.detail);
    this.put("/", this.middleware("isLogin"), this.controller.update);
    this.get("/list", this.permission("admin"), this.controller.list);
  }
}

export default UserRoute;
