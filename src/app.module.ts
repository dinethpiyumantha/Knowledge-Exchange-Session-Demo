import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLLoggerInterceptor } from './common/interceptors/graphql-logger.interceptor';
import { ComplexityPlugin } from './graphql/complexity.plugin';
import { GraphQLError } from 'graphql';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        const { message, extensions } = error;
        return {
          message,
          extensions: {
            ...extensions,
            stacktrace: undefined,
          },
        }
      }
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLLoggerInterceptor,
    },
    // ComplexityPlugin
  ],
})

export class AppModule {}
