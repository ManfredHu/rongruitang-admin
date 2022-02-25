import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;
  @Column()
  username: string;
  @Column()
  password: string;
}