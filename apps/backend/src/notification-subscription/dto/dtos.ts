import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export type CreateNotificationSubscriptionDTO =
  CreateNotificationSubscriptionPathParams & CreateNotificationSubscriptionBody;

export class CreateNotificationSubscriptionPathParams {
  @IsString()
  channelId: string;
}

class WebPushDetailKeys {
  @IsString()
  auth: string;

  @IsString()
  p256dh: string;
}

class WebPushDetail {
  @IsString()
  endpoint: string;

  @Type(() => WebPushDetailKeys)
  @ValidateNested()
  keys: WebPushDetailKeys;
}

export class CreateNotificationSubscriptionBody {
  @Type(() => WebPushDetail)
  @ValidateNested()
  webPushDetail: WebPushDetail;
}
