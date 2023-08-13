import * as morgan from "morgan";
import * as fs from "fs";
import config from "../config/loger";

export default morgan(config.format, {
  stream: fs.createWriteStream(config.path, {
    flags: "a",
  }),
});
