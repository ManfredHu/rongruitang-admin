## client
base vue3 + vite, vite run on port 3001

- ui framework [Naive UI](https://www.naiveui.com/zh-CN/os-theme/docs/usage-sfc)
## server
base nestjs, run on port 3000

- [GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Use Apollo Sandbox](https://www.apollographql.com/blog/announcement/platform/apollo-sandbox-an-open-graphql-ide-for-local-development/) 更好管理GraphQL

### 统一输出

success base `server/src/core/interceptor/transform.interceptor.ts`
```base
{
  data: Record<strign, any>,
  code: 0,
  msg: ''
}
```

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

### vscode plugin

- [](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

## build
output direactory: `dist/client` or `dist/server`
