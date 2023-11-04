import UserService from "../service/users.service";
import IUsers from "../interface/users.interface";
import MemoryDB from "../../../utils/database/mongoose/memoryDB";

beforeAll(async () => {
  await MemoryDB.connect();
});

afterAll(async () => {
  await MemoryDB.close();
});

let userSample: IUsers;

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

    userSample = user;

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

  it("should get error duplicate validation", async () => {
    try {
      const user = await UserService.create({
        email: "helmitrisna86@gmail.com",
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
    expect(user?.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
  });
});

describe("Service / user / findById", () => {
  it("should find user by id", async () => {
    const user = await UserService.findById(userSample._id);
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
      _id: userSample._id,
      username: "mantaps jiwa",
    });
    expect(user).toBeDefined();
    expect(user?.toObject()).toMatchObject({
      email: "helmitrisna86@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
  });
});

describe("Service / user / findOneOrFail", () => {
  it("should find user one user", async () => {
    const user = await UserService.findOneOrFail({
      _id: userSample._id,
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
        _id: userSample._id,
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
  it("should update user", async () => {
    const user = await UserService.findByIdAndUpdate(userSample._id, {
      email: "kelasduade@gmail.com",
    });

    expect(user).toBeDefined();
    expect(user).toMatchObject({
      email: "kelasduade@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });

    userSample = user as IUsers;
  });
});

describe("Service / user / updatePassword", () => {
  it("should update user password", async () => {
    const user = await UserService.updatePassword(
      { _id: userSample._id },
      "12345"
    );

    expect(user).toBeDefined();
    expect(user.password).not.toBe(userSample.password);
    expect(user).toMatchObject({
      email: "kelasduade@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
    userSample = user;
  });
});

describe("Service / user / matchPassword", () => {
  it("should matching user password", async () => {
    const user = await UserService.matchPassword(
      { _id: userSample._id },
      "12345"
    );
    expect(user).toBeDefined();
  });
});

describe("Service / user / updateOtp", () => {
  it("should update user otp", async () => {
    const user = await UserService.updateOtp(userSample._id, "12345");

    expect(user).toBeDefined();
    expect(user.otp).not.toBe(userSample.otp);
    expect(user).toMatchObject({
      email: "kelasduade@gmail.com",
      username: "mantaps jiwa",
      status: "user",
      emailVerified: false,
    });
    userSample = user;
  });
});

describe("Service / user / matchOtp", () => {
  it("should matching user otp", async () => {
    const user = await UserService.matchOtp({ _id: userSample._id }, "12345");
    expect(user).toBeDefined();
  });
});

describe("Service / user / updateVerified", () => {
  it("should update user verified", async () => {
    const user = await UserService.updateVerified(userSample);

    expect(user).toBeDefined();
    expect(user?.otp).not.toBeDefined();
    expect(user?.validator).toBe(0);
    expect(user?.emailVerified).toBe(true);
    userSample = user as IUsers;
  });
});

describe("Service / user / delete", () => {
  it("should delete user", async () => {
    const user = await UserService.delete(userSample);

    expect(user).toBeDefined();
    expect(user.deletedCount).toBe(1);
  });
});
