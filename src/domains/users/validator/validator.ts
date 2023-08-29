import Validator from "../../../utils/http/validation/validation";

class UserValidator extends Validator {
  public test() {
    return this.validate([this.files("something").maxFile(1)]);
  }
}

export default UserValidator;
