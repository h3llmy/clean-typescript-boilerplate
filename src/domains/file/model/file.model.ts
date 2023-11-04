import Users from "../../users/model/users.model";
import { Schema, model } from "mongoose";
import IFile from "../interface/file.interface";
import { ISoftDeleteModel } from "utils/database/mongoose/plugin/softDelete/softDeleteModel";

const fileSchema = new Schema<IFile>(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: Users,
      required: true,
    },
    sharedUser: [
      {
        type: Schema.Types.ObjectId,
        ref: Users,
      },
    ],
    status: {
      type: String,
      enum: ["public", "private", "onlyShared"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

const File = model<IFile, ISoftDeleteModel<IFile>>("File", fileSchema);

export default File;
