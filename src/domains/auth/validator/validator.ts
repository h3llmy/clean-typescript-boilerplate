import Validator from "../../../utils/http/validation/validation";

class AuthValidator extends Validator {
  public register() {
    return this.validate([
      this.body("username").required().isString(),
      this.body("password").required().isString().minLength(8).maxLength(15),
      this.body("email").required().isEmail(),
    ]);
  }

  public test() {
    return this.validate([
      // this.files("file")
      //   .required()
      //   // .minSize(5000 * 1000)
      //   .mimeType(["application/json", "image/jpeg", "image/png"]),
    ]);
  }
}

export default AuthValidator;
