import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_user_email_verification',
})
export class UserEmailVerificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'verf_code',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  verificationCode: string;

  @Column({
    name: 'expired_at',
    type: 'datetime',
    nullable: false,
  })
  expiredAt: Date;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.emailVerifications)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
