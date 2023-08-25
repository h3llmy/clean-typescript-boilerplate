export default interface IValidationRule {
  validator: (value: any) => boolean;
  message: string;
}
