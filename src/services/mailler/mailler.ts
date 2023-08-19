import * as nodemailer from "nodemailer";
import * as ejs from "ejs";
import * as fs from "fs";

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

  public to(email: string | string[]): this {
    this.emailOptions.to = email;
    return this;
  }

  public subject(subject: string): this {
    this.emailOptions.subject = subject;
    return this;
  }

  public html(html: string, data?: any): Promise<boolean> {
    try {
      const template = fs.readFileSync(html, "utf-8");

      const renderedTemplate = template.replace(
        /{{(.*?)}}/g,
        (_, expression) => {
          return eval(expression.trim());
        }
      );
      // const htmlContent = ejs.renderFile(`./src/${html}`, data);
      this.emailOptions.html = renderedTemplate;
      console.log(template);

      return this.send();
    } catch (error) {
      console.error(error);
      throw new Exception("Fail To Send Email", 500);
    }
  }

  public text(text: string): Promise<boolean> {
    this.emailOptions.text = text;
    return this.send();
  }

  private async send(): Promise<boolean> {
    try {
      if (Array.isArray(this.emailOptions.to)) {
        this.emailOptions.to.forEach((emailTo: string) => {
          this.transporter.sendMail(emailTo);
        });
      } else {
        await this.transporter.sendMail(this.emailOptions);
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Exception("Fail To Send Email", 500);
    }
  }
}

export default Mail;
