import MongoMemoryServer from "mongodb-memory-server-core";
import mongoose from "mongoose";
import "../../globalFunction/index";

class MemoryDB {
  /**
   * connect to mongo db memory server
   */
  static async connect() {
    const mongoServer = await MongoMemoryServer.create();
    return await mongoose.connect(mongoServer.getUri());
  }

  /**
   * disconnect to mongo db memory server
   */
  static async close() {
    await mongoose.disconnect();
    return await mongoose.connection.close();
  }
}

export default MemoryDB;
