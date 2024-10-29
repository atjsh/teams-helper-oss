import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_DATASOURCE_NAMES } from '../common/typeorm-datasource-names';
import { UserEntity } from '../entities/user.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { SessionModule } from '../session/session.module';

@Module({
    imports: [
        SessionModule,
        TypeOrmModule.forFeature([UserEntity], TYPEORM_DATASOURCE_NAMES.DEFAULT)
    ],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {}
