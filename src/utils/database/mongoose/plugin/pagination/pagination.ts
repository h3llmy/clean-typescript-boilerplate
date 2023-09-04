import mongoose from "mongoose";

export default function paginationPlugin(schema: mongoose.Schema) {
  (schema.statics as any).paginate = function (query, options) {
    return this.find();
  };
}
