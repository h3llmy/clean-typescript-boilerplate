import Validator from "../../../utils/http/validation/validation";

class UserValidator extends Validator {
  public test() {
    return this.validate([
      this.files("something")
        .required()
        .mimeType([
          "audio/mpeg",
          "audio/mp3",
          "audio/flac",
          "audio/wav",
          "audio/midi",
        ])
        .maxFile(1),
    ]);
  }
}

export default UserValidator;
