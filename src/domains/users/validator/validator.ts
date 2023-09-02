import Validator from "../../../utils/http/validation/validation";

class UserValidator extends Validator {
  public test() {
    return this.validate([
      this.query("limit").isNumber(),
      this.query("skip").isNumber(),
    ]);
  }
}

export default UserValidator;
