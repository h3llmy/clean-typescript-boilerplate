import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import UserService from "../service/service";
import "../../../utils/globalFunction/index";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

let userId: string;

describe("Service / user / create", () => {
  it("should create user", async () => {
    const user = await UserService.create({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      password: "mantap",
      otp: "12312",
      status: "user",
      emailVerified: false,
    });
    userId = user._id.toString();

    expect(user).toBeTruthy();
    expect(user.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
    expect(user.password).toBeDefined();
    expect(user.otp).toBeDefined();
  });

  it("should get error validation", async () => {
    try {
      const user = await UserService.create({
        email: "helmitrisna86gmail.com",
        username: "mantaps jiwa",
        password: "mantap",
        otp: "12312",
        status: "user",
        emailVerified: false,
      });
      expect(user).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe("Service / user / findByEmailOrUsername", () => {
  it("should find user by username or email", async () => {
    const user = await UserService.findByEmailOrUsername(
      "helmitrisna86@gmail.com",
      "mantaps jiwa"
    );
    expect(user).toBeDefined();
    expect(user.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
  });
});

describe("Service / user / findById", () => {
  it("should find user by id", async () => {
    const user = await UserService.findById(userId);
    expect(user).toBeDefined();
    expect(user.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
  });
});

describe("Service / user / findOne", () => {
  it("should find user one user", async () => {
    const user = await UserService.findOne({
      _id: userId,
      username: "mantaps jiwa",
    });
    expect(user).toBeDefined();
    expect(user.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
  });
});

describe("Service / user / ", () => {
  it("should find user one user", async () => {
    const user = await UserService.findOneOrFail({
      _id: userId,
      username: "mantaps jiwa",
    });
    expect(user).toBeDefined();
    expect(user.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
  });
  it("should get error user not foud", async () => {
    try {
      const user = await UserService.findOneOrFail({
        _id: userId,
        username: "mantaps jiwas",
      });
      expect(user).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Exception);
    }
  });
});

describe("Service / user / findAndPaginate", () => {
  it("should find user with paginate", async () => {
    const user = await UserService.findAndPaginate(1, 10, {
      status: "user",
    });
    expect(user).toBeDefined();
    expect(user).toMatchObject([
      {
        email: "helmitrisna86@gmail.com",
        username: "mantaps jiwa",
        status: "user",
        emailVerified: false,
      },
    ]);
  });
});

describe("Service / user / countPage", () => {
  it("should count total user page", async () => {
    const user = await UserService.countPage(5, { name: "mantaps jiwa" });
    expect(user).toBeDefined();
  });
});

describe("Service / user / findByIdAndUpdate", () => {
  it("should find user by username or email", async () => {
    const user = await UserService.findByIdAndUpdate(userId, {
      email: "kelasduade@gmail.com",
    });

    expect(user).toBeDefined();
    expect(user.email).toBe("kelasduade@gmail.com");
    // expect(user).toContainEqual({
    //   email: "helmitrisna86@gmail.com",
    //   username: "mantaps jiwa",
    //   status: "user",
    //   emailVerified: false,
    // });
  });
});
