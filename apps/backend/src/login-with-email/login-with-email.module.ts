import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { SessionModule } from '../session/session.module';
import { LoginWithEmailService } from './login-with-email.service';
import { LoginWithController } from './login-with-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_DATASOURCE_NAMES } from '../common/typeorm-datasource-names';
import { UserEmailVerificationEntity } from '../entities/user-meta/email-verification.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    EmailModule,
    SessionModule,
    TypeOrmModule.forFeature(
      [UserEmailVerificationEntity, UserEntity],
      TYPEORM_DATASOURCE_NAMES.DEFAULT,
    ),
  ],
  controllers: [LoginWithController],
  providers: [LoginWithEmailService],
})
export class LoginWithEmailModule {}
