import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
import * as uuid from 'uuid'
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: MongoRepository<User>) {

  }

  async create(input: UserInput): Promise<User> {
    console.log(`user service create() exec`)
    const user = new User();
    user._id = uuid.v4();
    user.username = input.username;
    user.password = input.password;
    console.log(`user service save user`, user);
    return this.userRepository.save(user); // 返回的是promise
  }

  async findAll(): Promise<User[]> {
    console.log(`user service findAll() exec`);
    return this.userRepository.find() // 返回的是promise
  }
}
