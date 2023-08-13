import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import "./env/env";
import "./httpError/httpError";
import IUsers from "../../domains/users/interface";

declare global {
  function env(name: string, optional?: any): string;
  interface IRequest extends Request {
    user: IUsers;
    files?: any;
  }
  interface IRouter {
    router: Router;
    prefix?: string;
  }
  interface IResponse extends Response {}
  interface INext extends NextFunction {}
  interface IRequestHandler extends RequestHandler {}
}
