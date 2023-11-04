import Validation from "../../../utils/http/validation/validation";

class UserValidator extends Validation {
  public list() {
    return this.validate([
      this.query("limit").isNumber(),
      this.query("skip").isNumber(),
      this.query("emailVerified").isBoolean(),
    ]);
  }
}

export default UserValidator;
