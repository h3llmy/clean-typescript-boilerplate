import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import "./env/env";
import "./asset/asset";
import "./httpError/httpError";
import IUsers from "../../domains/users/interface/interface";
import { UploadedFile } from "express-fileupload";
import * as React from "react";

declare global {
  /**
   * get env or give default value when env not found
   *
   * Example:
   *
   * env("PORT", 3000)
   *
   * that will return port from .env or when not foud that will return 3000
   *
   */
  function env(name: string, optionalValue?: any): string;
  function asset(path: string): string;
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
    mime: string;
  }
  interface IResponse extends Response {
    view: (component: React.ComponentType<any>, data?: object) => void;
  }
  interface INext extends NextFunction {}
  interface IRequestHandler extends RequestHandler {}
}
