import { LoggerService } from "@api-core/modules/logger/logger.service";
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PrismaClientKnownRequestError } from "@api-core/generated/prisma-client/runtime/library";
import { PrismaException } from "../exceptions/prisma.exception";
import { ElinksException } from "../exceptions/elinksException";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ElinksException) {
          this.logger.warn(err.getResponse());
          return throwError(() => err);
        }
        // This supports the current method of throwing exceptions
        if (err instanceof HttpException) {
          this.logger.warn(err.getResponse());
          return throwError(() => new BadRequestException(err.message));
        }
        if (err instanceof PrismaClientKnownRequestError) {
          this.logger.error(err);
          return throwError(() => new PrismaException(err));
        }
        this.logger.error(err);

        return throwError(
          () => new InternalServerErrorException("Internal Server Error")
        );
      })
    );
  }
}
