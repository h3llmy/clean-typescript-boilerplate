import ValidateChain from "./validatorChain";

class Validator {
  public body = (field: string) => {
    const validatorChain = new ValidateChain();
    validatorChain.fieldName = field;
    validatorChain.pathName = "body";
    return validatorChain;
  };

  public query = (field: string) => {
    const validatorChain = new ValidateChain();
    validatorChain.fieldName = field;
    validatorChain.pathName = "query";
    return validatorChain;
  };

  public validate = (
    validators: ValidateChain[],
    options?: { returnValidatedOnly?: boolean }
  ) => {
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

export default Validator;
