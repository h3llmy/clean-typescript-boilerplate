import * as nodemailer from "nodemailer";

class Mail {
  private transporter: nodemailer.Transporter;
  private emailOptions: nodemailer.SendMailOptions;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env("MAILLER_HOST", "stmp.gmail.com"),
      service: env("MAILLER_SERVICE", "gmail"),
      port: Number(env("MAILLER_PORT", 587)),
      secure: true,
      requireTLS: true,
      auth: {
        user: env("MAILLER_USERNAME"),
        pass: env("MAILLER_PASSWORD"),
      },
    });

    this.emailOptions = {
      from: env("MAILLER_FROM_ADDRES"),
      to: "",
      subject: "",
      html: "",
      text: "",
    };
  }

  public to(email: string): this {
    this.emailOptions.to = email;
    return this;
  }

  public subject(subject: string): this {
    this.emailOptions.subject = subject;
    return this;
  }

  public html(html: string): Promise<boolean> {
    this.emailOptions.html = html;
    return this.send();
  }

  public text(text: string): Promise<boolean> {
    this.emailOptions.text = text;
    console.log(this.emailOptions);

    return this.send();
  }

  private async send(): Promise<boolean> {
    try {
      await this.transporter.sendMail(this.emailOptions);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}

export default Mail;
