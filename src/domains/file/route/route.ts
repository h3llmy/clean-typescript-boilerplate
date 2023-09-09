import Route from "../../../utils/http/route/route";
import FileController from "../controller/controller";
import FileValidator from "../validator/validator";

class FileRoute extends Route {
  private controller = new FileController();
  private validator = new FileValidator();
  readonly prefix = "/file";

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.post(
      "/",
      this.permission("authenticated"),
      this.withFile(),
      this.validator.create(),
      this.controller.create
    );
  }
}

export default FileRoute;
