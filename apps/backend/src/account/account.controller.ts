import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { SessionAuthGuard } from '../session/session.guard';

@Controller()
@UseGuards(SessionAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('account/profile/me')
  getCurrentSessionProfile() {
    return this.accountService.getCurrentSessionProfile();
  }
}
