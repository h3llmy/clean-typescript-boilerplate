import Mail from "../../services/mailler/mailler";
import AuthToken from "../../services/authToken/jwt";

class AuthController {
  public register(req: IRequest, res: IResponse) {
    new Mail()
      .to("helmytrisna86@gmail.com")
      .subject("testing email")
      .html("<h1>hello world!</h1>");
    res.json({
      register: "(req.files.file as IUploadedFile).data,",
    });
  }
}

export default AuthController;
