import RateLimiterMiddleware from "../middlewares/rateLimiter";
import AuthMiddleware from "../middlewares/auth";
import LogerMiddleware from "../middlewares/loger";
import * as ExpressMongoSanitize from "express-mongo-sanitize";
import Scheduler from "../utils/scheduler/scheduler";
// import * as express from "express";
// import publicDirectory from "../config/fileDirectory";

// implement middeleware to all route
export const middlewares: IRequestHandler[] = [
  LogerMiddleware.loger(),
  AuthMiddleware.auth,
  RateLimiterMiddleware.rateLimiter(),
  ExpressMongoSanitize(),
  // express.static(publicDirectory.directory),
];

// implement middleware to spesific route use this.middleware("{middleware name}") to use it in the controller
export const routeMiddlewares = {} satisfies Record<string, IRequestHandler>;

// implement scheduler
export const scheduler: Scheduler[] = [];
