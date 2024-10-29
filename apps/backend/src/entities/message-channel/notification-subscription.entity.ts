import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageChannelParticipantEntity } from './message-channel-participant.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_noti_subscription',
})
export class NotificationSubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'channel_participant_id',
    type: 'int',
    nullable: false,
  })
  channelParticipantId: number;

  @ManyToOne(
    () => MessageChannelParticipantEntity,
    (participant) => participant.notificationSubscriptions,
  )
  @JoinColumn({ name: 'channel_participant_id' })
  messageChannelParticipant: MessageChannelParticipantEntity;

  @Column({
    name: 'web_push_detail',
    type: 'text',
    nullable: false,
  })
  webPushDetail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
