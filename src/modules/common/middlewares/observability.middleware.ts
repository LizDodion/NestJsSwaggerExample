import { FastifyRequest, FastifyReply } from "fastify";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { LoggerService } from "@api-core/modules/logger/logger.service";
import { MathUtils } from "../utils/math.utils";
@Injectable()
export class ObservabilityMiddleware implements NestMiddleware {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly mathUtils: MathUtils
  ) {}

  use(
    req: FastifyRequest["raw"],
    res: FastifyReply["raw"],
    next: () => void
  ): void {
    // Generate a unique request ID
    const requestId = this.mathUtils.generateRandomHashForRequestId();
    // log the request
    this.loggerService.log("🟢 request received", {
      req: {
        id: requestId,
        url: req.url,
        method: req.method,
      },
    });
    // Attach a request ID to the request object and logger
    req["requestId"] = requestId;
    this.loggerService.setRequestId(requestId);

    // Pass control to the next middleware or route handler
    next();
  }
}
