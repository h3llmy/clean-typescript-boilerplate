class ErrorHandler {
  static handler(err: Exception, req: IRequest, res: IResponse, next: INext) {
    const status = err.statusCode || 500;
    const message: any = err.message || "Something went wrong";
    const path = err.path;

    if (!["production", "stageing"].includes(env("NODE_ENV", "development"))) {
      console.error(err);
    }

    if ((err as any)?.code === 11000) {
      res.status(422).json({
        message: "Duplicate key error in the collection",
        path: (err as any)?.keyValue,
      });
    } else if ((err as any)?.message?.includes("validation failed")) {
      const errorsPath = Object.keys((err as any)?.errors);
      const singleObject = {};

      errorsPath.forEach((key) => {
        singleObject[key] = (err as any)?.errors[key].kind;
      });

      res
        .status(422)
        .json({ message: (err as any)?._message, path: singleObject });
    } else {
      res.status(status).json({ message, path });
    }
  }
}

export default ErrorHandler;
