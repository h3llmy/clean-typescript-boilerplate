import * as morgan from "morgan";
import * as fs from "fs";
import config from "../config/loger";

class LogerMiddleware {
  /**
   * create loger application
   */
  static loger() {
    return morgan(config.format, {
      stream: fs.createWriteStream(config.path, {
        flags: "a",
      }),
    });
  }
}

export default LogerMiddleware;
