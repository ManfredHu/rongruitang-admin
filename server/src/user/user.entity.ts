import { Entity, Column, ObjectIdColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;
  
  @Column()
  private _username: string;
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  @Column()
  password: string;
}