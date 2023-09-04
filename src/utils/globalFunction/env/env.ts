import * as dotenv from "dotenv";

dotenv.config({
  path: `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`,
});

globalThis.env = (name: string, optionalValue?: any): any => {
  return process.env[name] || optionalValue;
};
