## client

[toc]

base vue3 + vite, vite run on port 3001

- 前端 http://localhost:3001
- 后台 http://localhost:9000
  - Swagger接口文档 http://localhost:9000/docs/
  - GraphQL控制台 

- ui framework [Naive UI](https://www.naiveui.com/zh-CN/os-theme/components/input)
## server
base nestjs, run on port 9000

- [GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Use Apollo Sandbox](https://www.apollographql.com/blog/announcement/platform/apollo-sandbox-an-open-graphql-ide-for-local-development/) 更好管理GraphQL

### 统一输出

#### nestjs框架默认
nest默认输出如下
```json
{
  "statusCode": 401,
  "error":"Not Found",
  "message":"Cannot GET /member"
}
```
默认错误异常抛出
形如 `import { UnauthorizedException } from '@nestjs/common';`可以从`@nestjs/common'`获取到，具体的statusCode和message对应如下，经过如上转化`statusCode`会变为`code`，`message`对应`msg`

| 异常类型        | statusCode   |  message  |
| --------   | -----:  | :----:  |
|BadRequestException| 400| Bad Request|
|UnauthorizedException  | 401| Unauthorized|
|NotFoundException| | |
|ForbiddenException| | |
|NotAcceptableException| | |
|RequestTimeoutException| | |
|ConflictException| | |
|GoneException| | |
|PayloadTooLargeException| | |
|UnsupportedMediaTypeException| | |
|UnprocessableException| | |
|InternalServerErrorException| | |
|NotImplementedException| | |
|BadGatewayException| | |
|ServiceUnavailableException| | |
|GatewayTimeoutException| | |

#### 统一res输出
主要是`code: 0`定义为正常业务请求，而`code !== 0`定义为异常业务请求，如果是全局的http错误全局捕获统一输出

success base `server/src/core/interceptor/transform.interceptor.ts`
```base
{
  data: Record<strign, any>,
  code: 0,
  msg: ''
}
```

#### 统一错误输出
error base `server/src/core/filter/http-exception.filter.ts`

因 `HttpException` 类型支持 `string | Record<string, any>`
对应`string`异常写法 `throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);`
```base
{
  data: null,
  code: -1, // 默认错误码
  msg: "Forbidden" // 对应string输出
}
```

对应`Record<string, any>`异常写法 `throw new HttpException({ code: -2, msg: "发生错误"},HttpStatus.UNAUTHORIZED);`
```base
{
  data: null,
  code: -2, // 自定义错误码
  msg: "发生错误" // 自定义输出
}
```


### 日志输出
拦截器在 `server/src/core/interceptor/logging.interceptor.ts`，全局使用，应上报res和req参数等方便日志查询

### Swagger接口文档

open [http://localhost:9000/docs](http://localhost:9000/docs)

挂controller上接口分类和接口描述
```ts
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: '测试'})
}
```

#### entity实体字段定义
实体可以定义字段描述和默认值，装饰器和注释都支持，可以看[示例](https://github.com/nestjs/nest/blob/master/sample/11-swagger/src/cats/entities/cat.entity.ts)

```ts
export class Cat {
  /**
   * The name of the Cat
   * @example Kitty
   */
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}
```

#### 接口返回

默认get成功200,post成功201,如果是其他错误码需要补充完善

```ts
export class CatsController {
  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
```

#### jwt鉴权

对应小🔒，主要是接口如果鉴权需要标注，可以在controller全局定义，如下

```ts
@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {}
```

### TypeORM 
[TypeORM里insert和save关系](https://stackoverflow.com/questions/69642819/what-the-difference-between-save-and-insert-when-wanting-to-create-new-record-in)

MongoRepository 继承 Repository 基类， Repository有兼容mysql，mongodb等的公共方法

可以翻阅TypeORM的[方法签名代码](https://github.com/typeorm/typeorm/blob/master/src/repository/MongoRepository.ts)看到

#### 创建（Create）
- save: 如果实体不存在数据库则插入，否则更新
- create: 创建新实体实例
- insert: 
  - 插入实体到数据库，与save方法不同的是，save方法执行的基元操作不包括级联、关系和其他操作
  - insert执行更加高效
  - 不检查数据库中是否存在实体，因此如果插入重复实体，查询将失败

#### 更新（Update）

#### 读取（Retrieve）

```
find 一个数组返回所有集合
findAndCount [一个数组返回所有集合, count]
```

#### 删除（Delete）
### MongoDB的ObjectID

TypeORM对应MongoDB的列时,id作为主键存在，是一个Object。原型有方法`getTimestamp`，来自[这里](https://stackoverflow.com/questions/7327296/how-do-i-extract-the-created-date-out-of-a-mongo-objectid)

```js
ObjectId.prototype.getTimestamp = function() {
    return new Date(parseInt(this.toString().slice(0,8), 16)*1000);
}
```

故对应实体如下的列，其创建时间可以直接调用`getTimestamp()`获取到。如果要Hex值可以调用`userId: user.id.toHexString(),`这样的写法

```ts
import {
  BaseEntity,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
  // mongodb 不能使用@PrimaryGeneratedColumn
  @ObjectIdColumn()
  id: ObjectID;
}
```

如id为622879123c52bbdea50fdd6b,取前8位`62287912`转化为16进制得unix时间戳`1646819602`

### vscode plugin

- [mongodb](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

## build
output direactory: `dist/client` or `dist/server`
