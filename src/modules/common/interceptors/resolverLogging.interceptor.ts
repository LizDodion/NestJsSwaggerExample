import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoggerService } from "@api-core/modules/logger/logger.service";
import { ConfigService } from "@api-core/modules/config/config.service";

@Injectable()
export class ResolverLoggingInterceptor implements NestInterceptor {
  constructor(private config: ConfigService, private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //     if (this.isGQLHttpExecutionContext(context)) {
    //       // It is a GqlExecutionContext
    //       this.logger.log("✅ graphql received", {
    //         ctx: {
    //           mode: context.getType(),
    //           module: context.getClass().name.replace(/Resolver$/, ""),
    //           resolver: context.getHandler().name,
    //           // is it a query or resolver?
    //           type: context.getArgs()[2].__currentQuery.startsWith("mutation")
    //             ? "mutation"
    //             : "query",
    //         },
    //       });
    //
    //       if (this.config.isGraphqlQueryLogEnabled) {
    //         this.logger.log(
    //           `🧪 gql: ${context.getArgs()[2].__currentQuery.replace(/\n\s*$/, "")}
    // ✏️ gqlVariables: ${JSON.stringify(
    //             context.getArgs()[3].variableValues,
    //             null,
    //             2
    //           )}`
    //         );
    //       }
    //     } else {
    const request = context.switchToHttp().getRequest();
    this.logger.log("✅ controller request received", {
      ctx: {
        mode: context.getType(),
        module: context.getClass().name.replace(/Controller$/, ""),
        controller: context.getHandler().name,
        // Full URL from the request object (excluding query parameters)
        fullUrl: request.url.split("?")[0],
      },
    });
    if (this.config.isGraphqlQueryLogEnabled) {
      this.logger.log(
        `🧪 controller args: ${JSON.stringify(context.getArgs()[0].raw.query)}`
      );
    }
    // }
    // Always call next.handle() for both types of context
    return next.handle().pipe(tap(() => {}));
  }

  // private isGQLHttpExecutionContext(
  //   context: ExecutionContext
  // ): context is GqlExecutionContext {
  //   return (
  //     "getType" in context &&
  //     (context.getType() as GqlContextType) === "graphql"
  //   );
  // }
}
