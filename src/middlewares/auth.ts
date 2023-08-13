import IUsers from "domains/users/interface";
import { decodeToken } from "../services/authToken/jwt";

class AuthMiddleware {
  static auth(req: IRequest, res: IResponse, next: INext) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        next();
      } else if (authorization && authorization.startsWith("Bearer")) {
        const token = authorization.split(" ")[1];
        const decodedToken = decodeToken(token);
        if (!decodedToken) {
          throw Exception.unauthorized();
        }

        req.user = decodedToken as IUsers;

        next();
      }
    } catch (error) {
      throw Exception.unauthorized();
    }
  }

  static isLogin(req: IRequest, res: IResponse, next: INext) {
    if (req.user) {
      next();
    }
    throw Exception.unauthorized();
  }
}

export default AuthMiddleware;
