import { Injectable } from '@nestjs/common';
import { CreateNotificationSubscriptionDTO } from './dto/dtos';

@Injectable()
export class NotificationSubscriptionService {
  constructor() {}

  async createNotificationSubscription(
    dto: CreateNotificationSubscriptionDTO,
  ) {}
}
