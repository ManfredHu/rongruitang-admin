// from https://github.com/k-code-yt/nestjs-gql-neo4j/blob/main/generate-typings.ts
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./server/**/*.graphql'], // typePath属性指示GraphQLModule应在何处查找您要编写的GraphQL SDL架构定义文件。这些文件将在内存中合并；这允许您将架构拆分成几个文件，并将它们定位在它们的解析器附近
  path: join(process.cwd(), './server/src/schema/graphql.ts'), // 最后汇总输出到这里
  outputAs: 'class',
});