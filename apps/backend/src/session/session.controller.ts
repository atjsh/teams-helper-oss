import { Controller, Post, Req, Res } from '@nestjs/common';
import { SessionService } from './session.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('logout')
  async logout(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.sessionService.logout({
      request,
      response,
    });
  }
}
