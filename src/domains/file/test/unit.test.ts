import FileService from "../service/service";
import IFile from "../interface/interface";
import MemoryDB from "../../../utils/database/mongoose/memoryDB";
import UserService from "../../users/service/service";
import IUsers from "../../users/interface/interface";

let user: IUsers;
let file: IFile;

beforeAll(async () => {
  await MemoryDB.connect();
  user = await UserService.create({
    email: "test@gmail.com",
    username: "mantaps jiwa",
    password: "mantap",
    otp: "12312",
    status: "user",
    emailVerified: false,
  });
});

afterAll(async () => {
  await MemoryDB.close();
});

describe("Service / file / create", () => {
  it("should create file", async () => {
    file = await FileService.create({
      name: "something",
      ownerId: user._id,
      url: "http://localhost:3000",
      size: 3000,
      mimeType: "image/png",
      status: "public",
    });

    expect(file).toBeDefined();
    expect(file.toObject()).toMatchObject({
      name: "something",
      ownerId: user._id,
      url: "http://localhost:3000",
      size: 3000,
      mimeType: "image/png",
      status: "public",
    });
  });

  it("should get error duplicate validation", async () => {
    try {
      const fileFind = await FileService.create({
        name: "something",
        ownerId: user._id,
        url: "http://localhost:3000",
        size: 3000,
        mimeType: "image/png",
        status: "public",
      });

      expect(fileFind).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe('"Service / file / findByName', () => {
  it("should find file", async () => {
    const fileFind = await FileService.findByName("something");
    expect(fileFind).toBeDefined();
    expect(fileFind.toObject()).toMatchObject({
      name: "something",
      ownerId: user._id,
      url: "http://localhost:3000",
      size: 3000,
      mimeType: "image/png",
      status: "public",
    });
  });
});
