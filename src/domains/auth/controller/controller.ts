import Mail from "../../../services/mailler/mailler";

class AuthController {
  public register(req: IRequest, res: IResponse) {
    new Mail()
      .to("helmytrisna86@gmail.com")
      .subject("testing email")
      .html("./index.html", { name: ["aselole", "mantap", "joss"] });

    res.json({
      register: "(req.files.file as IUploadedFile).data,",
    });
  }
}

export default AuthController;
