import { Logger, PinoLogger } from "nestjs-pino";
import { LoggerService } from "@api-core/modules/logger/logger.service";

const pinoLogger = new PinoLogger({
  pinoHttp: {
    enabled: false,
  },
});
const logger = new Logger(pinoLogger, {});
export const loggerService = new LoggerService();
// logger
