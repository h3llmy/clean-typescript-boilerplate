import IFile from "../interface/interface";
import FileService from "../service/service";
import fileDirectory from "../../../config/fileDirectory";
import * as fs from "fs";
import * as path from "path";

class FileController {
  public async create(req: IRequest, res: IResponse) {
    const { files } = req.files;
    const { user } = req;
    const { sharedUser, status } = req.body;

    const fileData: Partial<IFile>[] = Array.isArray(files)
      ? files.map((value) =>
          FileService.createFileData(value, user.id, sharedUser, status)
        )
      : [FileService.createFileData(files, user.id, sharedUser, status)];

    const newFile = await FileService.create(fileData);

    res.json(newFile);
  }

  public async getFIle(req: IRequest, res: IResponse) {
    const { mimeType, fileName } = req.params;
    const { user } = req;
    const fileCheck = await FileService.findByNameAndMimeType(fileName);

    switch (fileCheck.status) {
      case "onlyShared":
        if (
          !fileCheck.ownerId === user?._id ||
          !fileCheck.sharedUser.includes(user?._id)
        ) {
          throw Exception.forbidden();
        }
        break;
      case "private":
        if (!user || !fileCheck.ownerId === user?._id) {
          throw Exception.forbidden();
        }
        break;
      default:
        break;
    }

    const filePath = `./${fileDirectory.directory}/${mimeType}/${fileName}`;
    if (!fs.existsSync(filePath)) {
      throw Exception.notFound(`file ${fileName} not found`);
    }
    res.sendFile(path.resolve(filePath));
  }

  public async list(req: IRequest, res: IResponse) {
    const { user } = req;
    const page = parseInt(String(req.query.page)) || 1;
    const limit = parseInt(String(req.query.limit)) || 10;

    const [files, totalPage] = await Promise.all([
      FileService.findByOwnerIdOrSharedUserWithPaginate(
        user._id,
        page,
        limit,
        req.query
      ),
      FileService.countPageByOwnerIdOrSharedUser(limit, user._id, req.query),
    ]);

    files.forEach((file) => {
      file.url = asset(file.url);
    });

    res.json({
      totalPage,
      currentPage: page,
      list: files,
    });
  }

  // update sharedUser, update status,
}

export default FileController;
