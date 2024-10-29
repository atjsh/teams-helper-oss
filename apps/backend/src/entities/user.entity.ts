import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageChannelParticipantEntity } from './message-channel/message-channel-participant.entity';
import { UserEmailVerificationEntity } from './user-meta/email-verification.entity';
import { UserGroupAssociationEntity } from './user-meta/user-group-association.entity';
import { UserSessionEntity } from './user-meta/user-session.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_user',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @OneToMany(
    () => MessageChannelParticipantEntity,
    (participant) => participant.user,
  )
  messageChannelParticipants: MessageChannelParticipantEntity[];

  @OneToMany(
    () => UserEmailVerificationEntity,
    (verification) => verification.user,
  )
  emailVerifications: UserEmailVerificationEntity[];

  @OneToMany(
    () => UserGroupAssociationEntity,
    (association) => association.user,
  )
  groupAssociations: UserGroupAssociationEntity[];

  @OneToMany(() => UserSessionEntity, (session) => session.user)
  sessions: UserSessionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
