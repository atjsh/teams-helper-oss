import { Body, Controller, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import {
  LoginWithEmailCreateVerificationCodeBody,
  LoginWithEmailGetSessionWithVerificationCodeBody,
} from './dto/dtos';
import { LoginWithEmailService } from './login-with-email.service';

@Controller('login-with-email')
export class LoginWithController {
  constructor(private readonly loginWithEmailService: LoginWithEmailService) {}

  @Post('create-verification-code')
  async createVerificationCode(
    @Body() body: LoginWithEmailCreateVerificationCodeBody,
  ) {
    return this.loginWithEmailService.createVerificationCode(body);
  }

  @Post('get-session-with-verification-code')
  async getSessionWithVerificationCode(
    @Body() body: LoginWithEmailGetSessionWithVerificationCodeBody,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.loginWithEmailService.getSessionWithVerificationCode({
      ...body,
      response,
    });
  }
}
