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

  static badRequest(message?: any) {
    return new Exception(
      message || "Bad Request",
      HttpExceptionStatusCode.BAD_REQUEST
    );
  }

  static unauthorized(message?: any) {
    return new Exception(
      message || "Unauthorized",
      HttpExceptionStatusCode.UNAUTHORIZED
    );
  }

  static paymentRequired(message?: any) {
    return new Exception(
      message || "Payment Required",
      HttpExceptionStatusCode.PAYMENT_REQUIRED
    );
  }

  static forbidden(message?: any) {
    return new Exception(
      message || "Forbidden",
      HttpExceptionStatusCode.FORBIDDEN
    );
  }

  static notFound(message?: any) {
    return new Exception(
      message || "Page Not Found!",
      HttpExceptionStatusCode.NOT_FOUND
    );
  }

  static methodNotAllowed(message?: any) {
    return new Exception(
      message || "Method Not Allowed",
      HttpExceptionStatusCode.METHOD_NOT_ALLOWED
    );
  }

  static notAcceptable(message?: any) {
    return new Exception(
      message || "Not Acceptable",
      HttpExceptionStatusCode.NOT_ACCEPTABLE
    );
  }

  static proxyAuthenticationRequired(message?: any) {
    return new Exception(
      message || "Proxy Authentication Required",
      HttpExceptionStatusCode.PROXY_AUTHENTICATION_REQUIRED
    );
  }

  static requestTimeout(message?: any) {
    return new Exception(
      message || "Request Timeout",
      HttpExceptionStatusCode.REQUEST_TIMEOUT
    );
  }

  static conflict(message?: any) {
    return new Exception(
      message || "Conflict",
      HttpExceptionStatusCode.CONFLICT
    );
  }

  static gone(message?: any) {
    return new Exception(message || "Gone", HttpExceptionStatusCode.GONE);
  }

  static lengthRequired(message?: any) {
    return new Exception(
      message || "Length Required",
      HttpExceptionStatusCode.LENGTH_REQUIRED
    );
  }

  static preconditionFailed(message?: any) {
    return new Exception(
      message || "Precondition Failed",
      HttpExceptionStatusCode.PRECONDITION_FAILED
    );
  }

  static payloadTooLarge(message?: any) {
    return new Exception(
      message || "Payload Too Large",
      HttpExceptionStatusCode.PAYLOAD_TOO_LARGE
    );
  }

  static uriTooLong(message?: any) {
    return new Exception(
      message || "URI Too Long",
      HttpExceptionStatusCode.URI_TOO_LONG
    );
  }

  static unsupportedMediaType(message?: any) {
    return new Exception(
      message || "Unsupported Media Type",
      HttpExceptionStatusCode.UNSUPPORTED_MEDIA_TYPE
    );
  }

  static rangeNotSatisfiable(message?: any) {
    return new Exception(
      message || "Range Not Satisfiable",
      HttpExceptionStatusCode.RANGE_NOT_SATISFIABLE
    );
  }

  static expectationFailed(message?: any) {
    return new Exception(
      message || "Expectation Failed",
      HttpExceptionStatusCode.EXPECTATION_FAILED
    );
  }

  static misdirectedRequest(message?: any) {
    return new Exception(
      message || "Misdirected Request",
      HttpExceptionStatusCode.MISDIRECTED_REQUEST
    );
  }

  static unprocessableEntity(message?: any) {
    return new Exception(
      message || "Unprocessable Entity",
      HttpExceptionStatusCode.UNPROCESSABLE_ENTITY
    );
  }

  static locked(message?: any) {
    return new Exception(message || "Locked", HttpExceptionStatusCode.LOCKED);
  }

  static failedDependency(message?: any) {
    return new Exception(
      message || "Failed Dependency",
      HttpExceptionStatusCode.FAILED_DEPENDENCY
    );
  }

  static tooEarly(message?: any) {
    return new Exception(
      message || "Too Early",
      HttpExceptionStatusCode.TOO_EARLY
    );
  }

  static upgradeRequired(message?: any) {
    return new Exception(
      message || "Upgrade Required",
      HttpExceptionStatusCode.UPGRADE_REQUIRED
    );
  }

  static preconditionRequired(message?: any) {
    return new Exception(
      message || "Precondition Required",
      HttpExceptionStatusCode.PRECONDITION_REQUIRED
    );
  }

  static tooManyRequests(message?: any) {
    return new Exception(
      message || "Too Many Requests",
      HttpExceptionStatusCode.TOO_MANY_REQUESTS
    );
  }

  static requestHeaderFieldsTooLarge(message?: any) {
    return new Exception(
      message || "Request Header Fields Too Large",
      HttpExceptionStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE
    );
  }

  static unavailableForLegalReasons(message?: any) {
    return new Exception(
      message || "Unavailable For Legal Reasons",
      HttpExceptionStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS
    );
  }

  static internalServerError(message?: any) {
    return new Exception(
      message || "Internal Server Error",
      HttpExceptionStatusCode.INTERNAL_SERVER_ERROR
    );
  }

  static notImplemented(message?: any) {
    return new Exception(
      message || "Not Implemented",
      HttpExceptionStatusCode.NOT_IMPLEMENTED
    );
  }

  static badGateway(message?: any) {
    return new Exception(
      message || "Bad Gateway",
      HttpExceptionStatusCode.BAD_GATEWAY
    );
  }

  static serviceUnavailable(message?: any) {
    return new Exception(
      message || "Service Unavailable",
      HttpExceptionStatusCode.SERVICE_UNAVAILABLE
    );
  }

  static gatewayTimeout(message?: any) {
    return new Exception(
      message || "Gateway Timeout",
      HttpExceptionStatusCode.GATEWAY_TIMEOUT
    );
  }

  static httpVersionNotSupported(message?: any) {
    return new Exception(
      message || "HTTP Version Not Supported",
      HttpExceptionStatusCode.HTTP_VERSION_NOT_SUPPORTED
    );
  }

  static variantAlsoNegotiates(message?: any) {
    return new Exception(
      message || "Variant Also Negotiates",
      HttpExceptionStatusCode.VARIANT_ALSO_NEGOTIATES
    );
  }

  static insufficientStorage(message?: any) {
    return new Exception(
      message || "Insufficient Storage",
      HttpExceptionStatusCode.INSUFFICIENT_STORAGE
    );
  }

  static loopDetected(message?: any) {
    return new Exception(
      message || "Loop Detected",
      HttpExceptionStatusCode.LOOP_DETECTED
    );
  }

  static notExtended(message?: any) {
    return new Exception(
      message || "Not Extended",
      HttpExceptionStatusCode.NOT_EXTENDED
    );
  }

  static networkAuthenticationRequired(message?: any) {
    return new Exception(
      message || "Network Authentication Required",
      HttpExceptionStatusCode.NETWORK_AUTHENTICATION_REQUIRED
    );
  }
}

(globalThis as any).Exception = Exception;
