import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_user_session',
})
export class UserSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    name: 'session_key',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  sessionKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    name: 'expiresAt',
    type: 'datetime',
    nullable: false,
  })
  expiresAt: Date;
}
