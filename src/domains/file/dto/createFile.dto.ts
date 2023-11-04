import { ObjectId } from "mongoose";
import { FileStatus } from "../interface/file.interface";

interface ICreate {
  sharedUser: ObjectId[];
  status: FileStatus;
}

export default ICreate;
