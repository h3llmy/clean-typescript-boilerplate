class UserController {
  public detail(req: IRequest, res: IResponse) {
    res.json({ joss: "mantap" });
  }

  public update(req: IRequest, res: IResponse) {
    res.json({ joss: "mantap" });
  }

  public list(req: IRequest, res: IResponse) {
    if (req.query.mantap) {
      throw new Exception("anjing", 500);
    }
    res.json({ mantap: new Date() });
  }
}

export default UserController;
