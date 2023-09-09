import IFile from "../interface/interface";
import File from "../model/model";

class FileService {
  static async create(filePayload: Partial<IFile> | Partial<IFile>[]) {
    return await File.create(filePayload);
  }
}

export default FileService;
