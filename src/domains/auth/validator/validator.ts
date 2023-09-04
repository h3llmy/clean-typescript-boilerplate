import Validation from "../../../utils/http/validation/validation";

class AuthValidator extends Validation {
  public register() {
    return this.validate([
      this.body("username").required().isString(),
      this.body("password").required().isString().minLength(8).maxLength(15),
      this.body("confirmPassword")
        .required()
        .isString()
        .minLength(8)
        .maxLength(15),
      this.body("email").required().isEmail(),
    ]);
  }

  public statusUpdate() {
    return this.validate([this.body("otp").required().isString()]);
  }

  public login() {
    return this.validate([
      this.body("username").required().isString(),
      this.body("password").required().isString().minLength(8).maxLength(15),
    ]);
  }

  public forgetPassword() {
    return this.validate([
      this.body("email").required().isEmail(),
      this.body("url").required().isUrl(),
    ]);
  }

  public resetPassword() {
    return this.validate([
      this.body("newPassword").required().isString().minLength(8).maxLength(15),
      this.body("confirmNewPassword")
        .required()
        .isString()
        .minLength(8)
        .maxLength(15),
    ]);
  }

  public refreshToken() {
    return this.validate([this.body("refreshToken").required().isString()]);
  }
}

export default AuthValidator;
