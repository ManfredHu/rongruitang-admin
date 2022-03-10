import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('post')
export class PostsEntity extends BaseEntity {
  // mongodb 不能使用@PrimaryGeneratedColumn
  @ObjectIdColumn()
  id: ObjectID;

  // @PrimaryGeneratedColumn()
  // id: number; // 标记为主列，值自动生成

  @ApiProperty({ example: 'title', description: 'post title, max length 50' })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @ApiProperty({ example: 'author', description: 'post author, max length 18' })
  @Column({ type: 'varchar', length: 18 })
  author: string;

  @ApiProperty({ example: 'content', description: '' })
  @Column({ type: 'text', default: null })
  content: string;

  @ApiProperty({ example: 'https://xxxxx', description: 'https://xxxxx' })
  @Column({ type: 'varchar', default: null })
  cover_url: string;

  @ApiProperty({ example: 0, description: 'post type' })
  @Column({ type: 'tinyint', default: 0 })
  type: number;

  // special column https://typeorm.io/#/entities/special-columns
  @ApiProperty({ example: 0, description: 'timestamp' })
  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @ApiProperty({ example: 0, description: 'timestamp' })
  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @ApiProperty({ example: 0, description: 'timestamp' })
  @DeleteDateColumn({ type: 'timestamp' })
  delete_time: Date;

  @VersionColumn({ type: 'smallint', unsigned: true })
  version: number;
}
