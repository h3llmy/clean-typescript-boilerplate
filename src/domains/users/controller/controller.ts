import Users from "../model/model";

class UserController {
  public async detail(req: IRequest, res: IResponse) {
    const userFind = await Users.findOne({ _id: req.user._id });
    res.json(userFind);
  }

  public update(req: IRequest, res: IResponse) {
    res.json(req.user);
  }

  public list(req: IRequest, res: IResponse) {
    if (req.query.mantap) {
      throw new Exception("anjing", 500);
    }
    res.json({ mantap: new Date() });
  }
}

export default UserController;
