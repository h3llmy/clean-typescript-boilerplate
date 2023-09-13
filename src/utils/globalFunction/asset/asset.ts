import fileDirectory from "../../../config/fileDirectory";

globalThis.asset = (path: string): string => {
  return `${env("asset")}${fileDirectory.fileUrl || ""}/${path}`;
};
