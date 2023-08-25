enum HttpExceptionStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

class Exception extends Error {
  public statusCode: HttpExceptionStatusCode;
  public path?: Record<string, any>;

  constructor(
    message: string | any,
    statusCode: HttpExceptionStatusCode = HttpExceptionStatusCode.INTERNAL_SERVER_ERROR,
    path?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message?: any, path?: any) {
    return new Exception(
      message || "Bad Request",
      HttpExceptionStatusCode.BAD_REQUEST,
      path
    );
  }

  static unauthorized(message?: any, path?: any) {
    return new Exception(
      message || "Unauthorized",
      HttpExceptionStatusCode.UNAUTHORIZED,
      path
    );
  }

  static paymentRequired(message?: any, path?: any) {
    return new Exception(
      message || "Payment Required",
      HttpExceptionStatusCode.PAYMENT_REQUIRED,
      path
    );
  }

  static forbidden(message?: any, path?: any) {
    return new Exception(
      message || "Forbidden",
      HttpExceptionStatusCode.FORBIDDEN,
      path
    );
  }

  static notFound(message?: any, path?: any) {
    return new Exception(
      message || "Page Not Found!",
      HttpExceptionStatusCode.NOT_FOUND,
      path
    );
  }

  static methodNotAllowed(message?: any, path?: any) {
    return new Exception(
      message || "Method Not Allowed",
      HttpExceptionStatusCode.METHOD_NOT_ALLOWED,
      path
    );
  }

  static notAcceptable(message?: any, path?: any) {
    return new Exception(
      message || "Not Acceptable",
      HttpExceptionStatusCode.NOT_ACCEPTABLE,
      path
    );
  }

  static proxyAuthenticationRequired(message?: any, path?: any) {
    return new Exception(
      message || "Proxy Authentication Required",
      HttpExceptionStatusCode.PROXY_AUTHENTICATION_REQUIRED,
      path
    );
  }

  static requestTimeout(message?: any, path?: any) {
    return new Exception(
      message || "Request Timeout",
      HttpExceptionStatusCode.REQUEST_TIMEOUT,
      path
    );
  }

  static conflict(message?: any, path?: any) {
    return new Exception(
      message || "Conflict",
      HttpExceptionStatusCode.CONFLICT,
      path
    );
  }

  static gone(message?: any, path?: any) {
    return new Exception(message || "Gone", HttpExceptionStatusCode.GONE, path);
  }

  static lengthRequired(message?: any, path?: any) {
    return new Exception(
      message || "Length Required",
      HttpExceptionStatusCode.LENGTH_REQUIRED,
      path
    );
  }

  static preconditionFailed(message?: any, path?: any) {
    return new Exception(
      message || "Precondition Failed",
      HttpExceptionStatusCode.PRECONDITION_FAILED,
      path
    );
  }

  static payloadTooLarge(message?: any, path?: any) {
    return new Exception(
      message || "Payload Too Large",
      HttpExceptionStatusCode.PAYLOAD_TOO_LARGE,
      path
    );
  }

  static uriTooLong(message?: any, path?: any) {
    return new Exception(
      message || "URI Too Long",
      HttpExceptionStatusCode.URI_TOO_LONG,
      path
    );
  }

  static unsupportedMediaType(message?: any, path?: any) {
    return new Exception(
      message || "Unsupported Media Type",
      HttpExceptionStatusCode.UNSUPPORTED_MEDIA_TYPE,
      path
    );
  }

  static rangeNotSatisfiable(message?: any, path?: any) {
    return new Exception(
      message || "Range Not Satisfiable",
      HttpExceptionStatusCode.RANGE_NOT_SATISFIABLE,
      path
    );
  }

  static expectationFailed(message?: any, path?: any) {
    return new Exception(
      message || "Expectation Failed",
      HttpExceptionStatusCode.EXPECTATION_FAILED,
      path
    );
  }

  static misdirectedRequest(message?: any, path?: any) {
    return new Exception(
      message || "Misdirected Request",
      HttpExceptionStatusCode.MISDIRECTED_REQUEST,
      path
    );
  }

  static unprocessableEntity(message?: any, path?: any) {
    return new Exception(
      message || "Unprocessable Entity",
      HttpExceptionStatusCode.UNPROCESSABLE_ENTITY,
      path
    );
  }

  static locked(message?: any, path?: any) {
    return new Exception(
      message || "Locked",
      HttpExceptionStatusCode.LOCKED,
      path
    );
  }

  static failedDependency(message?: any, path?: any) {
    return new Exception(
      message || "Failed Dependency",
      HttpExceptionStatusCode.FAILED_DEPENDENCY,
      path
    );
  }

  static tooEarly(message?: any, path?: any) {
    return new Exception(
      message || "Too Early",
      HttpExceptionStatusCode.TOO_EARLY,
      path
    );
  }

  static upgradeRequired(message?: any, path?: any) {
    return new Exception(
      message || "Upgrade Required",
      HttpExceptionStatusCode.UPGRADE_REQUIRED,
      path
    );
  }

  static preconditionRequired(message?: any, path?: any) {
    return new Exception(
      message || "Precondition Required",
      HttpExceptionStatusCode.PRECONDITION_REQUIRED,
      path
    );
  }

  static tooManyRequests(message?: any, path?: any) {
    return new Exception(
      message || "Too Many Requests",
      HttpExceptionStatusCode.TOO_MANY_REQUESTS,
      path
    );
  }

  static requestHeaderFieldsTooLarge(message?: any, path?: any) {
    return new Exception(
      message || "Request Header Fields Too Large",
      HttpExceptionStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE,
      path
    );
  }

  static unavailableForLegalReasons(message?: any, path?: any) {
    return new Exception(
      message || "Unavailable For Legal Reasons",
      HttpExceptionStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS,
      path
    );
  }

  static internalServerError(message?: any, path?: any) {
    return new Exception(
      message || "Internal Server Error",
      HttpExceptionStatusCode.INTERNAL_SERVER_ERROR,
      path
    );
  }

  static notImplemented(message?: any, path?: any) {
    return new Exception(
      message || "Not Implemented",
      HttpExceptionStatusCode.NOT_IMPLEMENTED,
      path
    );
  }

  static badGateway(message?: any, path?: any) {
    return new Exception(
      message || "Bad Gateway",
      HttpExceptionStatusCode.BAD_GATEWAY,
      path
    );
  }

  static serviceUnavailable(message?: any, path?: any) {
    return new Exception(
      message || "Service Unavailable",
      HttpExceptionStatusCode.SERVICE_UNAVAILABLE,
      path
    );
  }

  static gatewayTimeout(message?: any, path?: any) {
    return new Exception(
      message || "Gateway Timeout",
      HttpExceptionStatusCode.GATEWAY_TIMEOUT,
      path
    );
  }

  static httpVersionNotSupported(message?: any, path?: any) {
    return new Exception(
      message || "HTTP Version Not Supported",
      HttpExceptionStatusCode.HTTP_VERSION_NOT_SUPPORTED,
      path
    );
  }

  static variantAlsoNegotiates(message?: any, path?: any) {
    return new Exception(
      message || "Variant Also Negotiates",
      HttpExceptionStatusCode.VARIANT_ALSO_NEGOTIATES,
      path
    );
  }

  static insufficientStorage(message?: any, path?: any) {
    return new Exception(
      message || "Insufficient Storage",
      HttpExceptionStatusCode.INSUFFICIENT_STORAGE,
      path
    );
  }

  static loopDetected(message?: any, path?: any) {
    return new Exception(
      message || "Loop Detected",
      HttpExceptionStatusCode.LOOP_DETECTED,
      path
    );
  }

  static notExtended(message?: any, path?: any) {
    return new Exception(
      message || "Not Extended",
      HttpExceptionStatusCode.NOT_EXTENDED,
      path
    );
  }

  static networkAuthenticationRequired(message?: any, path?: any) {
    return new Exception(
      message || "Network Authentication Required",
      HttpExceptionStatusCode.NETWORK_AUTHENTICATION_REQUIRED,
      path
    );
  }
}

(globalThis as any).Exception = Exception;
