import { Options } from "morgan";

export default {
  path: "src/storage/app.log",
  format: [
    "ip: :remote-addr",
    ":method",
    ":url",
    "HTTP/:http-version",
    "status: :status",
    ":res[content-length]",
    "referrer: :referrer",
    "userAgent: :user-agent",
    "responseTime: :response-time ms",
  ].join(" | "),
};
