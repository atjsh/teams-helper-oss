import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { SessionService } from '../session/session.service';
import {
  LoginWithEmailCreateVerificationDTO,
  LoginWithEmailGetSessionWithVerificationCodeDTO,
} from './dto/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailVerificationEntity } from '../entities/user-meta/email-verification.entity';
import { TYPEORM_DATASOURCE_NAMES } from '../common/typeorm-datasource-names';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class LoginWithEmailService {
  constructor(
    private readonly emailService: EmailService,
    private readonly sessionService: SessionService,

    @InjectRepository(
      UserEmailVerificationEntity,
      TYPEORM_DATASOURCE_NAMES.DEFAULT,
    )
    private readonly userEmailVerificationRepository: Repository<UserEmailVerificationEntity>,

    @InjectRepository(UserEntity, TYPEORM_DATASOURCE_NAMES.DEFAULT)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createVerificationCode(
    dto: LoginWithEmailCreateVerificationDTO,
  ): Promise<void> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expiredAt = new Date(Date.now() + 1000 * 60 * 10);

    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      return;
    }

    await this.userEmailVerificationRepository.insert({
      userId: user.id,
      expiredAt,
      verificationCode: verificationCode,
    });

    await this.emailService.sendEmail({
      to: dto.email,
      subject: 'Verification Code',
      text: verificationCode,
      html: `<b>${verificationCode}</b>`,
    });

    return;
  }

  async getSessionWithVerificationCode(
    dto: LoginWithEmailGetSessionWithVerificationCodeDTO,
  ) {
    const verification = await this.userEmailVerificationRepository.findOne({
      where: {
        user: {
          email: dto.email,
        },
        verificationCode: dto.verificationCode,
      },
    });

    if (!verification) {
      return false;
    }

    const sessionKey = await this.sessionService.createUserSessionKey(
      verification.userId,
    );

    dto.response.setCookie('session', sessionKey);

    await this.userEmailVerificationRepository.delete(verification.id);

    return true;
  }
}
