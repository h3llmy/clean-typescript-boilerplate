import Validator from "../../../utils/http/validation/validation";

class AuthValidator extends Validator {
  public register() {
    return this.validate([
      this.body("username").required().isString(),
      this.body("password").required(),
      this.body("email").required(),
      this.query("userId").required().isNumber(),
    ]);
  }
}

export default AuthValidator;
