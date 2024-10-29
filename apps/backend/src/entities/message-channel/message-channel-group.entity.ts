import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageChannelEntity } from './message-channel.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_msg_channel_group',
})
export class MessageChannelGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => MessageChannelEntity, (channel) => channel.channelGroup)
  channels: MessageChannelEntity[];

  @Column({
    name: 'label',
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  label: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
