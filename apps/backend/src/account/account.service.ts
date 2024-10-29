import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { Repository } from 'typeorm';
import { AppClsStore } from '../cls-store/app-cls-store.interface';
import { TYPEORM_DATASOURCE_NAMES } from '../common/typeorm-datasource-names';
import { UserEntity } from '../entities/user.entity';
import { GetCurrentSessionProfileResponse } from './dto/dtos';

@Injectable()
export class AccountService {
  constructor(
    private readonly clsService: ClsService<AppClsStore>,

    @InjectRepository(UserEntity, TYPEORM_DATASOURCE_NAMES.DEFAULT)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getCurrentSessionProfile(): Promise<GetCurrentSessionProfileResponse> {
    const userId = this.clsService.get('userId');

    const userEntity = await this.userRepository.findOneOrFail({
      where: {
        id: userId,
      },
    });

    return {
      id: userEntity.id,
      email: userEntity.email,
    };
  }
}
