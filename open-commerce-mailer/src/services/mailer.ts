import nodemailer from "nodemailer";
import type { Transporter, SendMailOptions } from "nodemailer";

export class Mailer {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      options: {
        requireTLS: true,
      },
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  public async sendMail(mailObject: SendMailOptions): Promise<void> {
    await this.transporter.sendMail(mailObject);
  }
}
