import IFile from "../interface/interface";
import FileService from "../service/service";

class FileController {
  public async create(req: IRequest, res: IResponse) {
    const { files } = req.files;
    const { user } = req;
    const { sharedUser, status } = req.body;

    let fileData: Partial<IFile>[] = [];
    if (Array.isArray(files)) {
      files.forEach(async (file) => {
        fileData.push({
          url: file.filePath,
          name: file.name,
          ownerId: user._id,
          sharedUser,
          status,
        });
      });
    } else {
      fileData.push({
        url: files.filePath,
        name: files.name,
        ownerId: user._id,
        sharedUser,
        status,
      });
    }
    const newFile = await FileService.create(fileData);
    res.json(newFile);
  }
}

export default FileController;
