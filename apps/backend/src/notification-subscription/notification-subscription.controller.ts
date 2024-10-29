import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateNotificationSubscriptionBody,
  CreateNotificationSubscriptionPathParams,
} from './dto/dtos';
import { NotificationSubscriptionService } from './notification-subscription.service';

@Controller()
export class NotificationSubscriptionController {
  constructor(
    private readonly notificationSubscriptionService: NotificationSubscriptionService,
  ) {}

  @Post(`channels/:channelId/push-notification-subscriptions`)
  async createNotificationSubscription(
    @Body() body: CreateNotificationSubscriptionBody,
    @Param() params: CreateNotificationSubscriptionPathParams,
  ) {
    return this.notificationSubscriptionService.createNotificationSubscription({
      ...params,
      ...body,
    });
  }
}
