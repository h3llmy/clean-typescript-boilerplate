import FileValidateChain from "./fileValidatorChain";
import ValidateChain from "./validatorChain";

class Validation {
  public body = (field: string): ValidateChain => {
    return new ValidateChain(field, "body");
  };

  public query = (field: string): ValidateChain => {
    return new ValidateChain(field, "query");
  };

  public header = (field: string): ValidateChain => {
    return new ValidateChain(field, "headers");
  };

  public files = (field: string): FileValidateChain => {
    return new FileValidateChain(field, "files");
  };

  public validate = (
    validators: ValidateChain[] | FileValidateChain[]
  ): IRequestHandler => {
    return (req: IRequest, res: IResponse, next: INext) => {
      const errors: object = {
        body: {},
        query: {},
        files: {},
      };

      validators.forEach((validator) => {
        const fieldValue = req[validator.pathName][validator.fieldName];

        for (const rule of validator.rules) {
          if (
            !rule.validator(fieldValue) &&
            !errors[validator.pathName][validator.fieldName]
          ) {
            errors[validator.pathName][validator.fieldName] = rule.message;
          }
        }
      });

      const hasErrors = Object.keys(errors).some(
        (path) => Object.keys(errors[path]).length > 0
      );

      if (hasErrors) {
        throw Exception.unprocessableEntity("error validation", errors);
      }

      next();
    };
  };
}

export default Validation;
