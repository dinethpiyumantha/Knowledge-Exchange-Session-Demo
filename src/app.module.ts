import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLLoggerInterceptor } from './common/interceptors/graphql-logger.interceptor';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    UsersModule,
    PostsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLLoggerInterceptor,
    },
  ],
})

export class AppModule {}