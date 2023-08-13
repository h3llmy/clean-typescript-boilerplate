import * as express from "express";
import { middlewares } from "./kernel";
import ErrorHandler from "../utils/http/error/errorHandling";
import "../utils/globalFunction/index";
import "express-async-errors";
import ConnectMongoDB from "../utils/database/connection";
import * as compression from "compression";
import helmet from "helmet";
import * as cors from "cors";

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
    const port = env("port", 3000);
    this.app.listen(port, () => {
      console.log("\x1b[34m%s\x1b[0m", `App listening on the port ${port}`);
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

  private async connectDb() {
    try {
      const mongoose = await ConnectMongoDB.createConnection();
      console.log(
        "\x1b[34m%s\x1b[0m",
        `MongoDB connected: ${mongoose.connection.host}`
      );
    } catch (error) {
      console.error(error);
      let timer: number = 5000;
      console.error("reconnect to MongoDB");
      setTimeout(() => {
        ConnectMongoDB.createConnection();
        timer += 5000;
      }, timer);
    }
  }
}

export default App;
