import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@api-core/modules/config/config.service";
import { LoggerService } from "@api-core/modules/logger/logger.service";
import { createPrismaExtended } from "./extensions/extended.client";
import { Prisma, PrismaClient } from "@api-core/generated/prisma-client";

export * from "@api-core/generated/prisma-client";
export * from "./prisma.types";

type PrismaLogEvent = "query" | "info" | "warn" | "error";

export type PrismaClientKnownRequestError =
  Prisma.PrismaClientKnownRequestError;

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, PrismaLogEvent>
  implements OnModuleInit, OnModuleDestroy
{
  private _prisma: ReturnType<typeof createPrismaExtended>;

  constructor(private config: ConfigService, private logger: LoggerService) {
    super({
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "event",
          level: "error",
        },
        {
          emit: "event",
          level: "info",
        },
        {
          emit: "event",
          level: "warn",
        },
      ],
    });
    this.setPrismaLogging();
  }

  /**
   * log prisma queries, errors, info, and warnings
   * enable it by setting the env var IS_PRISMA_LOG_ENABLED to true
   * in the .env.local.me file (for local development)
   */
  setPrismaLogging(): void {
    if (!this.config.isPrismaLogEnabled) {
      return;
    }
    this.$on("query", async (e: Prisma.QueryEvent) => {
      this.logger.prismaLog(`🚀 Query: ${e.query}`, {
        duration: e.duration,
      });
    });
    this.$on("info", async (e: Prisma.LogEvent) => {
      this.logger.prismaLog(`ℹ️ Info: ${e.target}`);
    });
    this.$on("warn", async (e: Prisma.LogEvent) => {
      this.logger.prismaLog(`👮 Warn: ${e.message}`);
    });
    this.$on("error", async (e: Prisma.LogEvent) => {
      this.logger.prismaError(`🚨 Error: ${e.message}`);
    });
  }

  get extended(): ReturnType<typeof createPrismaExtended> {
    if (!this._prisma) {
      this._prisma = createPrismaExtended(this);
    }
    return this._prisma;
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
