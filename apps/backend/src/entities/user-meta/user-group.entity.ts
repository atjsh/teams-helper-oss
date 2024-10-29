import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserGroupAssociationEntity } from './user-group-association.entity';

@Entity({
  database: process.env.DB_DATABASE,
  name: 'tb_user_group',
})
export class UserGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'label',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  label: string;

  @OneToMany(
    () => UserGroupAssociationEntity,
    (association) => association.group,
  )
  userAssociations: UserGroupAssociationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
