export default interface IErrorValidation {
  body?: Record<string, any>;
  query?: Record<string, any>;
  files?: Record<string, any>;
  headers?: Record<string, any>;
}
