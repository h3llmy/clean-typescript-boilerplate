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
import { UploadedFile } from "express-fileupload";

declare global {
  function env(name: string, optional?: any): string;
  interface IRequest extends Request {
    user: IUsers;
    files?: { [formField: string]: IUploadedFile | IUploadedFile[] };
  }
  interface IRouter {
    router: Router;
    prefix?: string;
  }
  interface IUploadedFile extends UploadedFile {
    filePath: string;
    url: string;
    mime: string;
  }
  interface IResponse extends Response {}
  interface INext extends NextFunction {}
  interface IRequestHandler extends RequestHandler {}
}
