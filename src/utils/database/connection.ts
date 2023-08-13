import mongoose, { ConnectOptions } from "mongoose";

class ConnectMongoDB {
  static async createConnection() {
    try {
      mongoose.set("strictQuery", false);
      const conn = await mongoose.connect(env("MONGO_URI"), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions);

      return conn;
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", `Error: ${error.message}`);
      process.exit(1);
    }
  }
}

export default ConnectMongoDB;
