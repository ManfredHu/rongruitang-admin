## client

[toc]

base vue3 + vite, vite run on port 3001

- 前端 http://localhost:3001
- 后台 http://localhost:3000
  - Swagger接口文档 http://localhost:3000/docs/
  - GraphQL控制台 

- ui framework [Element Plus](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)
## server
base nestjs, run on port 3000

- [GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Use Apollo Sandbox](https://www.apollographql.com/blog/announcement/platform/apollo-sandbox-an-open-graphql-ide-for-local-development/) 更好管理GraphQL

### 统一输出

#### 统一res输出
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

open [http://localhost:9080/docs](http://localhost:9080/docs)

挂controller上接口分类和接口描述
```ts
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: '测试'})
}
```

### TypeORM 
[TypeORM里insert和save关系](https://stackoverflow.com/questions/69642819/what-the-difference-between-save-and-insert-when-wanting-to-create-new-record-in)

MongoRepository 继承 Repository 基类， Repository有兼容mysql，mongodb等的公共方法

- save: 如果实体不存在数据库则插入，否则更新
- create: 创建新实体实例
- insert: 
  - 插入实体到数据库，与save方法不同的是，save方法执行的基元操作不包括级联、关系和其他操作
  - insert执行更加高效
  - 不检查数据库中是否存在实体，因此如果插入重复实体，查询将失败
### vscode plugin

- [mongodb](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

## build
output direactory: `dist/client` or `dist/server`
