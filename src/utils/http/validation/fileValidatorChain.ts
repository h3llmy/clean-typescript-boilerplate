import IValidationRule from "./validationRuleInterface";
import Validator from "./validator";

type MimeType =
  | "text/plain"
  | "text/html"
  | "text/css"
  | "application/javascript"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/svg+xml"
  | "audio/mpeg"
  | "audio/wav"
  | "video/mp4"
  | "video/webm"
  | "application/json"
  | "application/pdf"
  | "application/zip"
  | "application/octet-stream"
  | "application/xml"
  | "text/csv"
  | "application/vnd.ms-excel"
  | "application/msword"
  | "application/vnd.ms-powerpoint"
  | "application/x-tar"
  | "application/gzip"
  | "application/javascript+module"
  | "application/sql"
  | "image/svg+xml"
  | "image/webp"
  | "image/tiff"
  | "video/x-msvideo"
  | "video/quicktime"
  | "audio/mp3"
  | "audio/flac"
  | "audio/midi"
  | "application/rdf+xml"
  | "application/atom+xml"
  | "application/rss+xml"
  | "text/vcard"
  | "text/markdown"
  | "text/yaml"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/gzip-compressed-tar"
  | "application/x-rar-compressed"
  | "font/ttf"
  | "font/otf";

class FileValidateChain {
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

  public maxSize = (limit: number | bigint): this => {
    this.rules.push({
      validator: (value: IUploadedFile): boolean => value?.size <= limit,
      message: `${this.fieldName} must smaller than ${limit} kb`,
    });
    return this;
  };

  public minSize = (limit: number | bigint): this => {
    this.rules.push({
      validator: (value: IUploadedFile): boolean => value?.size >= limit,
      message: `${this.fieldName} must larger than ${limit} kb`,
    });
    return this;
  };

  public mimeType = (type: MimeType | MimeType[]): this => {
    this.rules.push({
      validator: (value: IUploadedFile): boolean =>
        type.includes(value?.mimetype as MimeType),
      message: `${this.fieldName} must be ${type}`,
    });
    return this;
  };
}

export default FileValidateChain;
