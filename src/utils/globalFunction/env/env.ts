import * as dotenv from "dotenv";

dotenv.config();

globalThis.env = (name: string, optionalValue?: any): any => {
  return process.env[name] || optionalValue;
};
