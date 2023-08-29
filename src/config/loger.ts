export default {
  path: "app.log",
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
