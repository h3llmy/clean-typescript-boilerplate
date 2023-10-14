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

    this.get("/", this.permission("authenticated"), this.controller.list);

    this.get("/:mimeType/:fileName", this.controller.getFIle);

    this.put(
      "/update-shared-user/:fileId",
      this.permission("authenticated"),
      this.validator.updateSharedUser(),
      this.controller.updateSharedUser
    );

    this.put(
      "/update-status/:id",
      this.permission("authenticated"),
      this.validator.updateStatus(),
      this.controller.updateStatus
    );
  }
}

export default FileRoute;
