import Validation from "../../../utils/http/validation/validation";

class FileValidator extends Validation {
  public create() {
    return this.validate([
      this.body("sharedUser").custom(
        (value) =>
          value === undefined || value === null || Array.isArray(value),
        "sharedUser must be an array"
      ),
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
}

export default FileValidator;