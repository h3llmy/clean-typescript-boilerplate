import authConfig from "../../../config/auth";
import { routeMiddlewares } from "../../../app/kernel";
import { Router } from "express";
import { UserStatus } from "../../../domains/users/interface";
import FileUpload from "../fileUpload/fileUpload";

type Middleware = keyof typeof routeMiddlewares;

class Route implements IRouter {
  readonly router: Router = Router();
  protected routeMiddleware: { [key: string]: IRequestHandler };

  constructor() {
    this.routeMiddleware = routeMiddlewares;
  }

  public permission(
    permissions: UserStatus | UserStatus[] | "authenticated"
  ): IRequestHandler {
    return (req: IRequest, res: IResponse, next: INext) => {
      if (permissions === "authenticated" && !req.user) {
        throw Exception.forbidden();
      } else if (
        req.user &&
        !req.user[authConfig.permissionField] &&
        !permissions.includes(req.user[authConfig.permissionField])
      ) {
        throw Exception.forbidden();
      }
      next();
    };
  }

  public middleware(
    middlewareName: Middleware | Middleware[]
  ): IRequestHandler | IRequestHandler[] {
    if (Array.isArray(middlewareName)) {
      const middlewares = middlewareName.map((name) => routeMiddlewares[name]);
      return middlewares;
    } else {
      return routeMiddlewares[middlewareName];
    }
  }

  public withFile(): IRequestHandler {
    return new FileUpload().saveFile;
  }

  public get(
    path: string,
    ...handler: (IRequestHandler | IRequestHandler[])[]
  ): void {
    this.router.get(path, ...handler);
  }

  public post(
    path: string,
    ...handler: (IRequestHandler | IRequestHandler[])[]
  ): void {
    this.router.post(path, ...handler);
  }

  public put(
    path: string,
    ...handler: (IRequestHandler | IRequestHandler[])[]
  ): void {
    this.router.put(path, ...handler);
  }

  public patch(
    path: string,
    ...handler: (IRequestHandler | IRequestHandler[])[]
  ): void {
    this.router.patch(path, ...handler);
  }

  public delete(
    path: string,
    ...handler: (IRequestHandler | IRequestHandler[])[]
  ): void {
    this.router.delete(path, ...handler);
  }
}

export default Route;
