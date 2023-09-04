import Users from "../model/model";

class UserController {
  public async detail(req: IRequest, res: IResponse) {
    const user = await Users.findById(req.user._id).select("-password");
    res.json({ user });
  }

  public async update(req: IRequest, res: IResponse) {
    const { email, username, password } = req.body;

    const user = await Users.findByIdAndUpdate(req.user._id, {
      email,
      username,
      password,
    });

    res.json({ user });
  }

  public async list(req: IRequest, res: IResponse) {
    const { limit, skip, emailVerified } = req.query;

    const user = await Users.find()
      .select("-password -otp")
      .limit(Number(limit) || 10)
      .skip(Number(skip) || 0);

    res.json({ user });
  }
}

export default UserController;
