import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessagePublisherEntity } from './message-publisher.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_msg',
})
export class SentMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'publisher_id',
    type: 'int',
    nullable: false,
  })
  publisherId: number;

  @ManyToOne(
    () => MessagePublisherEntity,
    (publisher) => publisher.sentMessages,
  )
  @JoinColumn({ name: 'publisher_id' })
  publisher: MessagePublisherEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
