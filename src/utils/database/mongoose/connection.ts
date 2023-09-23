import mongoose, { ConnectOptions } from "mongoose";

class ConnectMongoDB {
  static async createConnection() {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(env("MONGO_URI"), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions);

      console.log(
        "\x1b[34m%s\x1b[0m",
        `MongoDB connected: ${mongoose.connection.host}`
      );
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", `Error: ${error.message}`);
      console.info(`reconnect to MongoDB...`);
      this.createConnection();
    }
  }
}

export default ConnectMongoDB;
