import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageChannelEntity } from './message-channel.entity';
import { NotificationSubscriptionEntity } from './notification-subscription.entity';
import { UserEntity } from '../user.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_msg_channel_participant',
})
export class MessageChannelParticipantEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'channel_id',
    type: 'int',
    nullable: false,
  })
  channelId: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => MessageChannelEntity, (channel) => channel.participants)
  @JoinColumn({ name: 'channel_id' })
  messageChannel: MessageChannelEntity;

  @ManyToOne(() => UserEntity, (user) => user.messageChannelParticipants)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(
    () => NotificationSubscriptionEntity,
    (subscription) => subscription.messageChannelParticipant,
  )
  notificationSubscriptions: NotificationSubscriptionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
