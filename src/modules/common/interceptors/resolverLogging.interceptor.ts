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
        `🧪 controller info
args: ${JSON.stringify(request.query, null, 2)}
body: ${JSON.stringify(request.body, null, 2)}
params: ${JSON.stringify(request.params, null, 2)}`
      );
    }
    // }
    // Always call next.handle() for both types of context
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return next.handle().pipe(tap(() => {}));
  }
}
