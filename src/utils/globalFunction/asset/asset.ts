import fileDirectory from "../../../config/fileDirectory";

globalThis.asset = (path: string): string => {
  return `${env("base_url") ?? env("asset")}${
    fileDirectory.fileUrl || ""
  }/${path}`;
};
