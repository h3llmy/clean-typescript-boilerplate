import * as nodemailer from "nodemailer";
import * as React from "react";
import RenderReact from "../../utils/viewEngine/reactToString";

/**
 * create new mail instance
 */
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

  /**
   * set email reciver
   *
   * @param email string | string[] (email)
   *
   * @returns this
   */
  public to(email: string | string[]): this {
    this.emailOptions.to = email;
    return this;
  }

  /**
   * set email subject
   *
   * @param subject string
   *
   * @returns this
   */
  public subject(subject: string): this {
    this.emailOptions.subject = subject;
    return this;
  }

  /**
   * send html email body
   *
   * @param component ComponentType
   *
   * @param data object
   *
   * @returns void
   */
  public async html(
    component: React.ComponentType<any>,
    data?: object
  ): Promise<boolean> {
    try {
      this.emailOptions.html = await new RenderReact().toString(
        component,
        data
      );

      return this.send();
    } catch (error) {
      console.error(error);
      throw new Exception("Fail To Send Email", 500);
    }
  }

  /**
   * set email text body
   *
   * @param text string
   *
   * @returns Promise boolean
   */
  public text(text: string): Promise<boolean> {
    this.emailOptions.text = text;
    return this.send();
  }

  /**
   * send the email
   *
   * @returns Promise boolean
   */
  private async send(): Promise<boolean> {
    try {
      if (Array.isArray(this.emailOptions.to)) {
        this.emailOptions.to.forEach(() => {
          this.transporter.sendMail(this.emailOptions);
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
