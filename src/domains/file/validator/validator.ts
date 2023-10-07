import Validation from "../../../utils/http/validation/validation";

class FileValidator extends Validation {
  public create() {
    return this.validate([
      this.body("sharedUser").isArray(),
      this.body("status").isString().enum(["public", "private", "onlyShared"]),
      this.files("files").required(),
    ]);
  }

  public list() {
    return this.validate([
      this.query("limit").isNumber(),
      this.query("skip").isNumber(),
    ]);
  }

  public updateSharedUser() {
    return this.validate([
      this.body("sharedUser").required().isArray().isObjectId(),
    ]);
  }
}

export default FileValidator;
