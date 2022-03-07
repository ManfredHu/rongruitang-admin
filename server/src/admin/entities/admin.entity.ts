import { BaseEntity, BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  VISITOR = 'visitor'
}

@Entity()
export class Admin extends BaseEntity {
  // mongodb 不能使用@PrimaryGeneratedColumn
  @ObjectIdColumn()
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string; //昵称

  @Exclude()
  @Column()
  password: string; // 密码

  @Column()
  avatar: string; //头像

  @Column()
  email: string;

  // root 读写都有,超级管理员
  // admin 读写都有，普通
  // visitor 只有读

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VISITOR,
  })
  role: UserRole; // 用户角色

  // 实现字段名驼峰转下划线命名, createTime和updateTime字段转为下划线命名方式存入数据库， 只需要在@Column装饰器中指定name属性；
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  // 使用了装饰器@BeforeInsert来装饰encryptPwd方法，表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的。
  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
