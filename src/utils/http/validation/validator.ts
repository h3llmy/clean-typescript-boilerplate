class Validator {
  static required = (value: any): boolean =>
    value !== undefined && value !== null && value !== "";

  static isEmail = (value: any): boolean =>
    Boolean(
      String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );

  static isUrl = (url: any): boolean =>
    Boolean(
      String(url)
        .toLowerCase()
        .match(
          /^(?:http(s)?:\/\/)?[\w.-]+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        )
    );

  static isIdPhone = (phone: any): boolean =>
    Boolean(String(phone).match(/^(?:\+62|0)[2-9]\d{7,12}$/));

  static isString = (value: any): boolean =>
    value === undefined || value === null || typeof value === "string";

  static isNumber = (value: any): boolean =>
    value === undefined ||
    value === null ||
    typeof parseInt(value) === "number";

  static minLength = (value: any, length: number): boolean => {
    if (typeof value === "string") {
      return value.length >= length;
    } else if (typeof value === "number") {
      return value >= length;
    }
  };

  static maxLength = (value: any, length: number): boolean => {
    if (typeof value === "string") {
      return value.length <= length;
    } else if (typeof value === "number") {
      return value <= length;
    }
  };
}

export default Validator;
