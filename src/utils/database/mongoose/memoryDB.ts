import MongoMemoryServer from "mongodb-memory-server-core";
import mongoose from "mongoose";
import "../../globalFunction/index";

class MemoryDB {
  static async connect() {
    const mongoServer = await MongoMemoryServer.create();
    return await mongoose.connect(mongoServer.getUri());
  }

  static async close() {
    await mongoose.disconnect();
    return await mongoose.connection.close();
  }
}

export default MemoryDB;
