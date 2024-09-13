import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Injectable()
export class GraphQLLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GraphQLLoggerInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const { operationName } = info;

    this.logger.log(
      `REQUEST_START | ${gqlContext.getClass().name} | ${info?.path?.typename}:${info?.path?.key} | args=${JSON.stringify(gqlContext.getArgs())}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.logger.log(
            `REQUEST_END   | ${gqlContext.getClass().name} | ${info?.path?.typename}:${info?.path?.key} | response=${JSON.stringify(data)}`,
          );
        },
        error: (error) => {
          this.logger.error(
            `ERROR | ${gqlContext.getClass().name} | ${info?.path?.typename}:${info?.path?.key} | Error: ${error.message}`,
          );
        },
      }),
    );
  }
}
