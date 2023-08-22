import * as fs from "fs";
import fileDirectory from "../../../config/fileDirectory";

class FileUpload {
  public initFile(req: IRequest, res: IResponse, next: INext) {
    if (req.files) {
      Object.keys(req.files).forEach((fileKey) => {
        const uploadedFiles = Array.isArray(req.files[fileKey])
          ? (req.files[fileKey] as IUploadedFile[])
          : [req.files[fileKey] as IUploadedFile];

        uploadedFiles.forEach((file: IUploadedFile) => {
          const mime = file.mimetype.split("/")[0];
          file.name = `${Date.now()}-${file.name}`;
          const filePath = `${mime}/${file.name}`;

          file.filePath = filePath;
          file.mime = mime;
        });

        req.files[fileKey] =
          uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;
      });
    }

    next();
  }

  public saveFile(req: IRequest, res: IResponse, next: INext) {
    res.on("finish", function () {
      if (req.files && res.statusCode >= 200 && res.statusCode < 400) {
        Object.keys(req.files).forEach((fileKey) => {
          const uploadedFiles = Array.isArray(req.files[fileKey])
            ? (req.files[fileKey] as IUploadedFile[])
            : [req.files[fileKey] as IUploadedFile];

          uploadedFiles.forEach((file: IUploadedFile) => {
            if (!fs.existsSync(`${fileDirectory.directory}/${file.mime}`)) {
              fs.mkdirSync(`${fileDirectory.directory}/${file.mime}`, {
                recursive: true,
              });
            }

            file.mv(`${fileDirectory.directory}/${file.filePath}`);
          });
        });
      }
    });
    next();
  }
}

export default FileUpload;
