import IUsers from "domains/users/interface/interface";
import AuthToken from "../services/authToken/jwt";
import Users from "../domains/users/model/model";

class AuthMiddleware {
  static async auth(req: IRequest, res: IResponse, next: INext) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        next();
      } else if (authorization?.startsWith("Bearer")) {
        const token = authorization.split(" ")[1];
        const decodedToken = AuthToken.decode(token) as IUsers;
        if (!decodedToken) {
          throw Exception.unauthorized();
        }

        const userCheck = await Users.findOne({
          _id: decodedToken._id,
          emailVerified: true,
        })
          .select("-password")
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
