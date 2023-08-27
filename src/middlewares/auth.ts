import AuthToken from "../services/authToken/jwt";
import Users from "../domains/users/model/model";
import { IAuthToken } from "domains/auth/interface/authTokenInterface";

class AuthMiddleware {
  static async auth(req: IRequest, res: IResponse, next: INext) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        next();
      } else if (authorization?.startsWith("Bearer")) {
        const token = authorization.split(" ")[1];
        const decodedToken = AuthToken.decode(token) as IAuthToken;
        if (decodedToken.type !== "login") {
          throw Exception.unauthorized();
        }

        const userCheck = await Users.findOne({
          _id: decodedToken._id,
          emailVerified: true,
        })
          .select("-password -otp")
          .orFail(Exception.unauthorized());

        req.user = userCheck;

        next();
      }
    } catch (error) {
      throw Exception.unauthorized();
    }
  }
}

export default AuthMiddleware;
