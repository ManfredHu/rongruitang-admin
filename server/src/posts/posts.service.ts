import { HttpException, Injectable, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, MongoRepository } from 'typeorm';
import { PostsEntity } from './entities/posts.entity';

export interface PostsRo {
  list: PostsEntity[];
  count: number;
}
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: MongoRepository<PostsEntity>,
  ) {}

  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    try {
      const rst = await this.postsRepository.save(post);
      console.log(rst)
      return rst
    } catch(err) {
      throw new HttpException({
        code: -3,
        msg: '存储失败',
        error: err.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query): Promise<PostsRo> {
    // const { pageNum = 1, pageSize = 10, ...params } = query;
    const posts = await this.postsRepository.find();
    console.log(`posts`, posts);
    return { list: posts, count: posts.length };
  }

  async findById(id: string): Promise<PostsEntity> {
    return await this.postsRepository.findOne(id);
  }

  async updateById(
    id: string,
    post: Partial<PostsEntity>,
  ): Promise<PostsEntity> {
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
    return await this.postsRepository.delete(id)
  }
}
