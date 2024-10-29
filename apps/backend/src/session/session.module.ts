import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_DATASOURCE_NAMES } from '../common/typeorm-datasource-names';
import { EmailModule } from '../email/email.module';
import { UserSessionEntity } from '../entities/user-meta/user-session.entity';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature(
      [UserSessionEntity],
      TYPEORM_DATASOURCE_NAMES.DEFAULT,
    ),
  ],
  providers: [SessionService],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionModule {}
