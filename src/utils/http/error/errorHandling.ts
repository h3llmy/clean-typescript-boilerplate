class ErrorHandler {
  static handler(err: Exception, req: IRequest, res: IResponse, next: INext) {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const path = err.path;
    if (env("NODE_ENV", "development") !== "production") {
      console.log(err);
    }
    res.status(status).json({
      message,
      path,
    });
  }
}

export default ErrorHandler;
