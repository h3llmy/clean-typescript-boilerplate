import AuthToken from "../../services/authToken/jwt";

class AuthController {
  public register(req: IRequest, res: IResponse) {
    res.json({
      register: `${req.protocol}://${req.hostname}${req.originalUrl}`,
    });
  }
}

export default AuthController;
