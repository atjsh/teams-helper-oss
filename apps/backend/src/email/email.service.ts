import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { CONFIG_KEYS } from '../enviroment-variable-config';

export interface SendEmailOption {
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: 'gmail', // TODO: 환경변수로 뺴기
      auth: {
        user: this.configService.get(CONFIG_KEYS.MAIL_AUTH_EMAIL_ADDRESS),
        pass: this.configService.get(CONFIG_KEYS.MAIL_AUTH_EMAIL_PASSWORD),
      },
    });
  }

  async sendEmail(options: SendEmailOption): Promise<void> {
    await this.nodemailerTransport.sendMail({
      from: this.configService.get(CONFIG_KEYS.MAIL_AUTH_EMAIL_ADDRESS),
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }
}
