import UserService from "../service/users.service";

class UserController {
  public async detail(req: IRequest, res: IResponse) {
    const user = await UserService.findById(req.user._id);

    res.json({ user });
  }

  public async update(req: IRequest, res: IResponse) {
    const { email, username, password } = req.body;

    const userUpdate = await UserService.findByIdAndUpdate(req.user._id, {
      email,
      username,
      password,
    });

    res.json({ user: userUpdate });
  }

  public async list(req: IRequest, res: IResponse) {
    const { query } = req;
    const page = parseInt(String(query.page)) || 1;
    const limit = parseInt(String(query.limit)) || 10;

    const [user, totalPage] = await Promise.all([
      UserService.findAndPaginate(page, limit),
      UserService.countPage(limit),
    ]);

    res.json({
      totalPage,
      currentPage: page || 1,
      list: user,
    });
  }
}

export default UserController;
