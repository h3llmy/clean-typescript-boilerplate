import { FilterQuery, ObjectId } from "mongoose";
import IFile, { FileStatus } from "../interface/interface";
import File from "../model/model";

class FileService {
  static async create(filePayload: Partial<IFile> | Partial<IFile>[]) {
    return await File.create(filePayload);
  }

  static async findByNameAndMimeType(name: string) {
    return await File.findOne({ name });
  }

  static createFileData(
    file: IUploadedFile,
    ownerId: ObjectId,
    sharedUser: ObjectId[],
    status: FileStatus
  ): Partial<IFile> {
    return {
      url: file.filePath,
      name: file.name,
      mimeType: file.mimetype,
      size: file.size,
      ownerId,
      sharedUser,
      status,
    };
  }

  static async findByOwnerIdOrSharedUserWithPaginate(
    userId: string,
    page: number = 1,
    limit: number = 10,
    filter?: Partial<IFile>
  ) {
    const filters: any = {};

    if (filter?.name) {
      filters.name = { $regex: filter?.name, $options: "i" };
    }
    if (filter?.mimeType) {
      filters.mimeType = filter?.mimeType;
    }

    return await File.find({
      ...filters,
      $or: [{ ownerId: userId }, { sharedUser: userId }],
    })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  static async countPageByOwnerIdOrSharedUser(
    limit: number = 10,
    userId: string,
    filter?: Partial<IFile>
  ) {
    const filters: any = {};

    if (filter) {
      if (filter.name) {
        filters.name = { $regex: filter.name, $options: "i" };
      }
      if (filter.mimeType) {
        filters.mimeType = filter.mimeType;
      }
    }
    return (
      Math.ceil(
        (await File.countDocuments({
          ...filters,
          $or: [{ ownerId: userId }, { sharedUser: userId }],
        })) / limit
      ) || 1
    );
  }
}

export default FileService;
