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
import "./splitStringByUpeercase/splitStringByUpercase";
import IUsers from "../../domains/users/interface/users.interface";
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
   * @param name string
   *
   * @param optionalValue any
   *
   * @returns string
   */
  function env(name: string, optionalValue?: any): string;
  /**
   * get file full path based on env BASE_URL
   *
   * Example:
   *
   * asset(file) // that will return like http://localhost:3000/api/v1/file/example.jpg
   *
   * that will return full path of file url
   *
   * @param path string
   *
   * @returns string
   */
  function asset(path: string): string;
  function splitStringByUpercase(word: string): string;
  interface IRequest<
    Body = any,
    File extends string = string,
    Query extends string = string
  > extends Request {
    user: IUsers;
    files?: Record<File, IUploadedFile | IUploadedFile[]>;
    body: Body;
    query: Record<Query, string>;
  }
  interface IUploadedFile extends UploadedFile {
    filePath: string;
    mime: string;
  }
  interface IRouter {
    router: Router;
    prefix?: string;
  }
  interface IResponse extends Response {
    /**
     * it just only used to render static page
     *
     */
    view: (component: React.ComponentType<any>, data?: object) => void;
  }
  interface INext extends NextFunction {}
  interface IRequestHandler extends RequestHandler {}
}
