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
import { UserEntity } from '../user.entity';
import { UserGroupEntity } from './user-group.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_user_group_association',
})
export class UserGroupAssociationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.groupAssociations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    name: 'group_id',
    type: 'int',
    nullable: false,
  })
  groupId: number;

  @ManyToOne(() => UserGroupEntity, (group) => group.userAssociations)
  @JoinColumn({ name: 'group_id' })
  group: UserGroupEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
