import { HttpException, Injectable, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';

export interface PostsRo {
  list: PostsEntity[];
  count: number;
}
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', HttpStatus.BAD_REQUEST);
    }
    // console.log(`title`, title, typeof title);

    // // 用户名查找
    // const doc = await this.postsRepository.findOne({
    //   where: { title },
    // });

    // if (doc) {
    //   throw new HttpException('同标题的文章已存在', HttpStatus.BAD_REQUEST);
    // }
    return await this.postsRepository.save(post);
  }

  async findAll(query): Promise<PostsRo> {
    // const { pageNum = 1, pageSize = 10, ...params } = query;
    const posts = await this.postsRepository.find()
    console.log(`posts`, posts);
    return { list: posts, count: posts.length };
  }

  async findById(id: string): Promise<PostsEntity> {
    return await this.postsRepository.findOne(id);
  }

  async updateById(id: string, post: Partial<PostsEntity>): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    console.log(`updatePost`, updatePost);
    return this.postsRepository.save(updatePost);
  }

  async remove(id: string) {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.postsRepository.remove(existPost);
  }
}
