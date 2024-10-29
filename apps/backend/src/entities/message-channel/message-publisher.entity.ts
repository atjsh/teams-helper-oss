import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SentMessageEntity } from './sent-message.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_msg_publisher',
})
export class MessagePublisherEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'label',
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  label: string;

  @Column({
    name: 'access_key',
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: false,
  })
  accessKey: string;

  @OneToMany(() => SentMessageEntity, (sentMessage) => sentMessage.publisher)
  sentMessages: SentMessageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
