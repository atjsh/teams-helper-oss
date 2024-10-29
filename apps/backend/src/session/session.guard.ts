import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ClsService } from 'nestjs-cls';
import { AppClsStore } from '../cls-store/app-cls-store.interface';
import { SessionService } from './session.service';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly clsService: ClsService<AppClsStore>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as FastifyRequest;
    const sessionCookie = request.cookies['session'];

    if (!sessionCookie) {
      return false;
    }

    const unsignResult = request.unsignCookie(sessionCookie);

    if (!unsignResult || !unsignResult.valid) {
      return false;
    }

    const user = await this.sessionService.getUserFromSessionKey(
      unsignResult.value,
    );

    if (!user) {
      return false;
    }

    this.clsService.set('userId', user.id);

    return true;
  }
}
