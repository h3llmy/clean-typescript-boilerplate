import { Options } from "express-rate-limit";

export default {
  windowMs: 5 * 60 * 1000,
  max: 50,
  skipSuccessfulRequests: true,
} as Options;
