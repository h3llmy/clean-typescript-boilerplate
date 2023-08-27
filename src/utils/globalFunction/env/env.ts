import * as dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

globalThis.env = (name: string, optionalValue?: any): any => {
  return process.env[name] || optionalValue;
};
