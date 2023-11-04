import { ObjectId } from "mongoose";
import IFile, { FileStatus } from "../interface/file.interface";
import File from "../model/file.model";
import fileDirectory from "../../../config/fileDirectory";
import * as fs from "fs";
import * as path from "path";

class FileService {
  static async create(filePayload: Partial<IFile> | Partial<IFile>[]) {
    return await File.create(filePayload);
  }

  static async findByName(name: string) {
    return await File.findOne({ name }).orFail(
      Exception.notFound(`file ${name} not found`)
    );
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

  static getDirectory(mimeType: string, fileName: string) {
    const filePath = `./${fileDirectory.directory}/${mimeType}/${fileName}`;
    if (!fs.existsSync(filePath)) {
      throw Exception.notFound(`file ${fileName} not found`);
    }

    return path.resolve(filePath);
  }

  static async updateSharedUser(
    _id: ObjectId,
    ownerId: ObjectId,
    sharedUser: ObjectId[]
  ) {
    if (sharedUser.map((user) => String(user)).includes(String(ownerId))) {
      throw Exception.badRequest("can't shared file to owner");
    }
    const file = await File.findOneAndUpdate(
      { _id, ownerId },
      { $set: { sharedUser } },
      { new: true }
    ).orFail(Exception.badRequest("file not found"));
    return file;
  }

  static async updateStatus(
    _id: ObjectId,
    ownerId: ObjectId,
    status: FileStatus
  ) {
    const file = await File.findOneAndUpdate(
      { _id, ownerId },
      { $set: { status } },
      { $new: true }
    ).orFail(Exception.notFound("file not found"));

    return file;
  }
}

export default FileService;
