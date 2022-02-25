import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  // 参数这里关联了service，会自动执行逻辑
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'world';
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll()
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return await this.userService.create(input)
  }
}
