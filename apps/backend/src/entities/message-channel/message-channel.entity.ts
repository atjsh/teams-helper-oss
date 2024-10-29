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
import { MessageChannelParticipantEntity } from './message-channel-participant.entity';
import { MessageChannelGroupEntity } from './message-channel-group.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_msg_channel',
})
export class MessageChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'label',
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  label: string;

  @Column({
    name: 'endpoint',
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: false,
  })
  endpoint: string;

  @Column({
    name: 'group_id',
    type: 'int',
    nullable: false,
  })
  channelGroupId: number;

  @ManyToOne(() => MessageChannelGroupEntity, (group) => group.channels)
  @JoinColumn({ name: 'group_id' })
  channelGroup: MessageChannelGroupEntity;

  @OneToMany(
    () => MessageChannelParticipantEntity,
    (participant) => participant.messageChannel,
  )
  participants: MessageChannelParticipantEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
