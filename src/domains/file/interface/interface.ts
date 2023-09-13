import { Document, ObjectId } from "mongoose";

export type FileStatus = "public" | "private" | "onlyShared";

export default interface IFile extends Document {
  url: string;
  name: string;
  mimeType: string;
  size: number;
  ownerId: ObjectId;
  sharedUser: ObjectId[];
  status: FileStatus;
}
