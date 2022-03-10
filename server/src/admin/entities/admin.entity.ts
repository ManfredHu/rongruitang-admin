import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';
import { salt } from '../../config/admin';

export enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  VISITOR = 'visitor',
}

@Entity()
export class Admin extends BaseEntity {
  // mongodb 不能使用@PrimaryGeneratedColumn
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 100 })
  username: string; // 用户名

  @Exclude()
  @Column()
  password: string; // 密码
  
  @Column()
  age?: number;

  @Column({ length: 100 })
  nickname?: string; //昵称

  @Column()
  avatar?: string; //头像

  @Column()
  email?: string;

  // root 读写都有,超级管理员
  // admin 读写都有，普通
  // visitor 只有读
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VISITOR,
  })
  role?: UserRole; // 用户角色

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime?: Date;

  // 使用了装饰器@BeforeInsert来装饰encryptPwd方法，表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的。
  @BeforeInsert()
  async encryptPwd() {
    const cipherText = await bcrypt.hashSync(this.password, salt);
    // Logger.log(
    //   `server/src/admin/entities/admin.entity.ts cipherText: ${cipherText}`,
    // );
    this.password = cipherText;
  }
}
