import AuthToken from "../../services/authToken/jwt";

class AuthController {
  public register(req: IRequest, res: IResponse) {
    res.json({
      register: "(req.files.file as IUploadedFile).data,",
    });
  }
}

export default AuthController;
