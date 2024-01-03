import { Injectable, LoggerService as ILogger } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { SanitiseResponse } from "@api-core/modules/common/decorators/sanitiseResponse.decorator";

@Injectable()
export class LoggerService implements ILogger {
  private requestId: string;

  // constructor() {} // private readonly logger: Logger

  @SanitiseResponse(String)
  getRequestId(): string {
    return this.requestId;
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  error(message: any, context?: any): void {
    console.log("asd");
    // this.logger.error(message, context);
  }

  log(message: any, context?: any): void {
    console.log("asd");
    // this.logger.log(message, context);
  }

  prismaLog(message: any, context?: any): void {
    console.log("asd");
    // this.logger.log(message, {
    //   ...context,
    //   requestId: this.getRequestId(),
    // });
  }

  prismaError(message: any, context?: any): void {
    console.log("asd");
    // this.logger.error(message, {
    //   ...context,
    //   requestId: this.getRequestId(),
    // });
  }

  warn(message: any, context?: any): void {
    console.log("asd");
    // this.logger.warn(message, context);
  }

  debug(message: any, context?: any): void {
    console.log("asd");
    // this.logger.debug(message, context);
  }

  verbose(message: any, context?: any): void {
    console.log("asd");
    // this.logger.verbose(message, context);
  }
}
