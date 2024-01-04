import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CatsModule } from "../cats/cats.module";
import { DogsModule } from "../dogs/dogs.module";
import { ConfigModule } from "@api-core/modules/config/config.module";
import { CommonModule } from "@api-core/modules/common/common.module";
import { LoggerModule } from "@api-core/modules/logger/logger.module";
import { PrismaModule } from "@api-core/modules/prisma/prisma.module";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";
import pino from "pino";
import { ObservabilityMiddleware } from "@api-core/modules/common/middlewares/observability.middleware";
import { HealthcheckModule } from "@api-core/modules/healthcheck/healthcheck.module";

@Module({
  imports: [
    CatsModule,
    DogsModule,
    ConfigModule,
    CommonModule,
    LoggerModule,
    PrismaModule,
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === "local"
            ? {
                target: "pino-pretty",
                options: {
                  colorize: true,
                  singleLine: true,
                },
              }
            : undefined,
        serializers: {
          req: pino.stdSerializers.wrapRequestSerializer((req) => {
            return {
              id: req.raw["requestId"],
              // add any other fields here for pino to log
            };
          }),
          res: pino.stdSerializers.wrapResponseSerializer((res) => {
            return {
              statusCode: res.raw.statusCode,
              // add any other fields here for pino to log
            };
          }),
        },
      },
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ObservabilityMiddleware).forRoutes("*"); // Apply to all routes
  }
}
