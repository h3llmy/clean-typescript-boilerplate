import Validator from "../../../utils/http/validation/validation";

class AuthValidator extends Validator {
  public register() {
    return this.validate([
      this.body("username").required().isString(),
      this.body("password").required().isString().minLength(8).maxLength(15),
      this.body("email").required().isEmail(),
    ]);
  }

  public statusUpdate() {
    return this.validate([this.body("otp").required().isString()]);
  }
}

export default AuthValidator;
