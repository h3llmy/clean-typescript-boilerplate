import { ObjectId } from "mongoose";
import IFile from "../interface/interface";
import FileService from "../service/service";
import UserService from "../../../domains/users/service/service";

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

    const fileCheck = await FileService.findByName(fileName);

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

    res.sendFile(FileService.getDirectory(mimeType, fileName));
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

  // update status,
  public async updateSharedUser(req: IRequest, res: IResponse) {
    const {
      params: { fileId },
      body: { sharedUser },
      user: { _id },
    } = req;

    const [_, file] = await Promise.all([
      UserService.checkUserIsAvilable(sharedUser),
      FileService.updateSharedUser(
        fileId as unknown as ObjectId,
        _id,
        sharedUser
      ),
    ]);

    res.json(file);
  }
}

export default FileController;
