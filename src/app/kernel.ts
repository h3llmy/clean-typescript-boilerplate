import rateLimiter from "../middlewares/rateLimiter";
import AuthMiddleware from "../middlewares/auth";
import loger from "../middlewares/loger";
import * as ExpressMongoSanitize from "express-mongo-sanitize";

export const middlewares: IRequestHandler[] = [
  loger,
  AuthMiddleware.auth,
  rateLimiter,
  ExpressMongoSanitize(),
];

export const routeMiddlewares = {
  isLogin: AuthMiddleware.isLogin,
} satisfies Record<string, IRequestHandler>;
