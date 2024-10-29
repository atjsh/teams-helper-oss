import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { ClsModule, ClsService } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppClsStore } from './cls-store/app-cls-store.interface';
import { TYPEORM_DATASOURCE_NAMES } from './common/typeorm-datasource-names';
import { EmailModule } from './email/email.module';
import { MessageChannelParticipantEntity } from './entities/message-channel/message-channel-participant.entity';
import { MessageChannelEntity } from './entities/message-channel/message-channel.entity';
import { MessagePublisherEntity } from './entities/message-channel/message-publisher.entity';
import { NotificationSubscriptionEntity } from './entities/message-channel/notification-subscription.entity';
import { SentMessageEntity } from './entities/message-channel/sent-message.entity';
import { UserEmailVerificationEntity } from './entities/user-meta/email-verification.entity';
import { UserGroupAssociationEntity } from './entities/user-meta/user-group-association.entity';
import { UserGroupEntity } from './entities/user-meta/user-group.entity';
import { UserSessionEntity } from './entities/user-meta/user-session.entity';
import { UserEntity } from './entities/user.entity';
import {
  CONFIG_KEYS,
  GLOBAL_CONFIG_MODULES,
} from './enviroment-variable-config';
import { SessionModule } from './session/session.module';
import { LoginWithEmailModule } from './login-with-email/login-with-email.module';
import { AccountModule } from './account/account.module';
import { MessageChannelGroupEntity } from './entities/message-channel/message-channel-group.entity';

@Module({
  imports: [
    ...GLOBAL_CONFIG_MODULES,
    TypeOrmModule.forRootAsync({
      name: TYPEORM_DATASOURCE_NAMES.DEFAULT,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow(CONFIG_KEYS.DB_HOST),
        port: configService.getOrThrow(CONFIG_KEYS.DB_PORT),
        username: configService.getOrThrow(CONFIG_KEYS.DB_USER),
        password: configService.getOrThrow(CONFIG_KEYS.DB_PASSWORD),
        entities: [
          UserEntity,
          UserSessionEntity,

          UserEmailVerificationEntity,
          UserGroupEntity,
          UserGroupAssociationEntity,

          MessageChannelEntity,
          MessageChannelGroupEntity,
          MessagePublisherEntity,

          SentMessageEntity,
          MessageChannelParticipantEntity,
          NotificationSubscriptionEntity,
        ],
        synchronize: true,
        logging: true,
      }),
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls: ClsService<AppClsStore>) => {
          cls.set('requestId', randomUUID());
        },
      },
      global: true,
    }),
    AccountModule,
    EmailModule,
    SessionModule,
    LoginWithEmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
