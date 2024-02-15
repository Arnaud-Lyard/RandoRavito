import nodemailer from "nodemailer";
import config from "config";
import pug from "pug";
import { convert } from "html-to-text";
import { Prisma } from "@prisma/client";

const smtp = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

export default class Email {
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#firstName = user.pseudo.split(" ")[0];
    this.#to = user.email;
    this.#from = `Team <team@relaxing-hippoquests.com>`;
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    // }
    console.log(smtp);
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    console.log("sending email");
    console.log("firstname", this.#firstName);
    console.log("subject", subject);
    console.log("url", this.url);
    console.log();
    const html = pug.renderFile(`./../views/${template}.pug`, {
      firstName: this.#firstName,
      subject,
      url: this.url,
    });
    console.log("html", html);
    // Create mailOptions
    const mailOptions = {
      from: this.#from,
      to: this.#to,
      subject,
      text: convert(html),
      html,
    };
    console.log("mailoptions", mailOptions);
    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log("info", info);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send("verificationCode", "Your account verification code");
  }

  async sendPasswordResetToken() {
    await this.send(
      "resetPassword",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}
