import { IsEmail, IsString } from 'class-validator';
import { FastifyReply } from 'fastify';

export class LoginWithEmailCreateVerificationCodeBody {
  @IsEmail()
  email: string;
}

export type LoginWithEmailCreateVerificationDTO =
  LoginWithEmailCreateVerificationCodeBody;

export class LoginWithEmailGetSessionWithVerificationCodeBody {
  @IsString()
  email: string;
  @IsString()
  verificationCode: string;
}

export interface LoginWithEmailGetSessionWithVerificationCodeContext {
  response: FastifyReply;
}

export type LoginWithEmailGetSessionWithVerificationCodeDTO =
  LoginWithEmailGetSessionWithVerificationCodeBody &
    LoginWithEmailGetSessionWithVerificationCodeContext;
