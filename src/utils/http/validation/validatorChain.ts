import { isValidObjectId } from "mongoose";
import Validator from "./validator";
import IValidationRule from "./validationRuleInterface";

class ValidateChain {
  public rules: IValidationRule[] = [];
  public fieldName: string = "";
  public pathName: string = "";

  constructor(fieldName: string, pathName: string) {
    this.fieldName = fieldName;
    this.pathName = pathName;
  }

  public required = (): this => {
    this.rules.push({
      validator: Validator.required,
      message: `${this.fieldName} is required`,
    });
    return this;
  };

  public isString = (): this => {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => Validator.isString(val));
        } else {
          return Validator.isString(value);
        }
      },
      message: `${this.fieldName} must be a string`,
    });
    return this;
  };

  public isIdPhone = (): this => {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => Validator.isIdPhone(val));
        } else {
          return Validator.isIdPhone(value);
        }
      },
      message: `${this.fieldName} must be an id phone number`,
    });
    return this;
  };

  public isNumber = (): this => {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => Validator.isNumber(val));
        } else {
          return Validator.isNumber(value);
        }
      },
      message: `${this.fieldName} must be a number`,
    });
    return this;
  };

  public isEmail = (): this => {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => Validator.isEmail(val));
        } else {
          return Validator.isEmail(value);
        }
      },
      message: `${this.fieldName} must be an email`,
    });
    return this;
  };

  public isUrl = (): this => {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => Validator.isUrl(val));
        } else {
          return Validator.isUrl(value);
        }
      },
      message: `${this.fieldName} must be an url`,
    });
    return this;
  };

  public isBoolean(): this {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => Validator.isBoolean(val));
        } else {
          return Validator.isBoolean(value);
        }
      },
      message: `${this.fieldName} must be an boolean`,
    });
    return this;
  }

  public isObjectId = (): this => {
    this.rules.push({
      validator: (value: any) => {
        if (Array.isArray(value)) {
          return value.some((val) => isValidObjectId(val));
        } else {
          return isValidObjectId(value);
        }
      },
      message: `${this.fieldName} must be an object id`,
    });
    return this;
  };

  public isArray = (): this => {
    this.rules.push({
      validator: Validator.isArray,
      message: `${this.fieldName} must be an array`,
    });
    return this;
  };

  public minLength = (length: number): this => {
    this.rules.push({
      validator: (value: any) => Validator.minLength(value, length),
      message: `${this.fieldName} must be at least ${length} characters long`,
    });
    return this;
  };

  public maxLength = (length: number): this => {
    this.rules.push({
      validator: (value: any) =>
        value === undefined ||
        value === null ||
        Validator.maxLength(value, length),
      message: `${this.fieldName} max ${length} characters long`,
    });
    return this;
  };

  public enum = (option: any[]): this => {
    this.rules.push({
      validator: (value: any) => option.includes(value),
      message: `${this.fieldName} must be ${option.toString()}`,
    });
    return this;
  };

  public regex = (regex: RegExp, message?: string): this => {
    this.rules.push({
      validator: (value: any) =>
        Boolean(String(value).toLowerCase().match(regex)),
      message: message || `${this.fieldName} is not match with regex pattren`,
    });
    return this;
  };

  public custom = (
    validator: (value: any) => boolean,
    message: string
  ): this => {
    this.rules.push({
      validator: validator,
      message,
    });
    return this;
  };
}

export default ValidateChain;
