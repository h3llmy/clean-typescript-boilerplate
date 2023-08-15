import * as express from "express";
import { middlewares } from "./kernel";
import ErrorHandler from "../utils/http/error/errorHandling";
import "../utils/globalFunction/index";
import "express-async-errors";
import ConnectMongoDB from "../utils/database/connection";
import * as compression from "compression";
import helmet from "helmet";
import * as cors from "cors";
import * as fileUpload from "express-fileupload";
import publicDirectory from "../config/publicDirectory";

class App {
  private app: express.Application;

  constructor(routes?: IRouter[]) {
    this.app = express();
    this.corsOrigin();
    this.connectDb();
    this.initializeMiddlewares();
    this.initializeControllers(routes);
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    let port = Number(env("port", 3000));
    this.startServer(port);
  }

  private startServer(port: number) {
    this.app
      .listen(port, () => {
        process.env.port = `${port}`;
        console.log("\x1b[34m%s\x1b[0m", `App listening on port ${port}`);
      })
      .on("error", (error) => {
        if ((error as any).code === "EADDRINUSE") {
          console.log("\x1b[33m%s\x1b[0m", `port ${port} is already in use`);
          port++;
          this.startServer(port);
        } else {
          console.error("Error starting server:", error);
        }
      });
  }

  private corsOrigin() {
    let appOrigin: string | string[] = env("CORS_ORIGIN");
    if (appOrigin) {
      appOrigin = appOrigin.replace(" ", "").split(",");
    }
    if (!appOrigin || appOrigin == "" || appOrigin.length <= 0) {
      console.log("\x1b[34m%s\x1b[0m", "all origin is allowed");
    } else {
      console.log("\x1b[34m%s\x1b[0m", "allowed origin : ", appOrigin);
    }
    this.app.use(
      cors({
        origin: function (origin, callback) {
          if (!appOrigin) return callback(null, true);
          if (appOrigin.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(
              new Exception(
                "The CORS policy for this site does not allow access from this Origin.Not allowed by CORS",
                403
              )
            );
          }
        },
      })
    );
  }

  private initializeMiddlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(fileUpload());
    this.app.use(express.static(publicDirectory.directory));
    this.app.use((req: IRequest, res: IResponse, next: INext) => {
      process.env.asset = env("NODE_ENV", "development")
        ? `${req.protocol}://${req.hostname}:${env("port")}`
        : `${req.protocol}://${req.hostname}`;
      next();
    });
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
      })
    );
    this.app.use((req: IRequest, res: IResponse, next: INext) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    });
    this.app.use(middlewares);
  }

  private initializeControllers(routes: IRouter[]) {
    routes?.forEach((route) => {
      this.app.use(`/api/v1${route.prefix || ""}/`, route.router);
    });
    this.app.use(`*`, (req, res) => {
      throw Exception.notFound();
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandler.handler);
  }

  private connectDb() {
    ConnectMongoDB.createConnection();
  }
}

export default App;
