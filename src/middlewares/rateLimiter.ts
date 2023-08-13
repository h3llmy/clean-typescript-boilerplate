import rateLimit from "express-rate-limit";
import config from "../config/rateLimiter";

class RateLimiterMiddleware {
  static rateLimiter() {
    return rateLimit({
      ...config,
      handler: (req, res) => {
        throw new Exception("Too many requests, please try again later.", 429);
      },
    });
  }
}

export default RateLimiterMiddleware;
