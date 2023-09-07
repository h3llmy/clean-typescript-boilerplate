import UserService from "../../users/service/service";

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
    const { limit, page } = req.query;

    const [user, totalPage] = await Promise.all([
      UserService.findAndPaginate(Number(page), Number(limit)),
      UserService.countPage(Number(limit)),
    ]);

    res.json({
      totalPage,
      currentPage: Number(page) || 1,
      list: user,
    });
  }
}

export default UserController;
