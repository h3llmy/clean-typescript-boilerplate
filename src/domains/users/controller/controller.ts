import Users from "../model/model";
import RegistrationOtp from "../../../services/mailler/views/registrationOtp";
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

  public test(req: IRequest, res: IResponse) {
    if (Array.isArray(req.files.something)) {
      Exception.badRequest();
    }
    res.view(RegistrationOtp, { otp: "123123" });
  }
}

export default UserController;
