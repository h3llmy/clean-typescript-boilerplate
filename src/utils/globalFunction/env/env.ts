import * as dotenv from "dotenv";

dotenv.config();

globalThis.env = (name: string, optional?: any): any => {
  return (process.env[name] || optional) as any;
};
