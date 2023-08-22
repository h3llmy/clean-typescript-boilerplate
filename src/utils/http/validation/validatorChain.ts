interface ValidationRule {
  validator: (value: any) => boolean;
  message: string;
}

class ValidateChain {
  public rules: ValidationRule[] = [];
  public fieldName: string = "";
  public pathName: string = "";

  public required = (): this => {
    this.rules.push({
      validator: (value: any) =>
        value !== undefined && value !== null && value !== "",
      message: `${this.fieldName} is required`,
    });
    return this;
  };

  public isString = (): this => {
    this.rules.push({
      validator: (value: any) =>
        value === undefined || value === null || typeof value === "string",
      message: `${this.fieldName} must be a string`,
    });
    return this;
  };

  public isNumber = (): this => {
    this.rules.push({
      validator: (value: any) =>
        value === undefined ||
        value === null ||
        typeof parseInt(value) === "number",
      message: `${this.fieldName} must be a number`,
    });
    return this;
  };

  public minLength = (length: number): this => {
    this.rules.push({
      validator: (value: any) =>
        typeof value === "string" && value.length >= length,
      message: `${this.fieldName} must be at least ${length} characters long`,
    });
    return this;
  };

  public maxLength = (length: number): this => {
    this.rules.push({
      validator: (value: any) =>
        typeof value === "string" && value.length <= length,
      message: `${this.fieldName} max ${length} characters long`,
    });
    return this;
  };
}

export default ValidateChain;
