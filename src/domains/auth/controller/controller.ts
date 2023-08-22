import Mail from "../../../services/mailler/mailler";

class AuthController {
  public register(req: IRequest, res: IResponse) {
    // new Mail()
    //   .to("helmytrisna86@gmail.com")
    //   .subject("testing email")
    //   .html("./index.html", { name: ["aselole", "mantap", "joss"] });

    console.log("mantap");

    res.json({
      register: req.body,
    });
  }
}

export default AuthController;
