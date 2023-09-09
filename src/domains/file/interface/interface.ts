import { Document, ObjectId } from "mongoose";

export type FileStatus = "public" | "private" | "onlyShared";

export default interface IFile extends Document {
  url: string;
  name: string;
  ownerId: ObjectId;
  sharedUser: ObjectId[];
  status: FileStatus;
}
