import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { TYPEORM_DATASOURCE_NAMES } from '../common/typeorm-datasource-names';
import { UserSessionEntity } from '../entities/user-meta/user-session.entity';
import { UserEntity } from '../entities/user.entity';
import { LogoutDTO } from './dto/dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSessionEntity, TYPEORM_DATASOURCE_NAMES.DEFAULT)
    private readonly userSessionRepository: Repository<UserSessionEntity>,
  ) {}

  async getUserFromSessionKey(sessionKey: string): Promise<UserEntity> {
    return (
      await this.userSessionRepository.findOneOrFail({
        where: {
          sessionKey: sessionKey,
        },
        relations: { user: true },
      })
    ).user;
  }

  /**
   *
   *
   * @param {UserEntity['id']} userId
   * @return {*} Session Key
   * @memberof SessionService
   */
  async createUserSessionKey(userId: UserEntity['id']): Promise<string> {
    const sessionKey = randomUUID();
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    await this.userSessionRepository.insert({
      sessionKey,
      user: { id: userId },
      expiresAt,
    });

    return sessionKey;
  }

  private async deleteSessionKey(sessionKey: string): Promise<void> {
    await this.userSessionRepository.delete({ sessionKey });
  }

  async logout(dto: LogoutDTO): Promise<void> {
    console.log(dto.request.cookies['session']);

    await this.deleteSessionKey(dto.request.cookies['session']);
    dto.response.clearCookie('session');
  }
}
