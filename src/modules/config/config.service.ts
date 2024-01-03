import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { LoggerService } from "../logger/logger.service";
import { AppConfigInput } from "./dto/appConfig.input";

@Injectable()
export class ConfigService {
  public readonly variable: AppConfigInput;

  constructor(protected readonly loggerService: LoggerService) {
    this.variable = this.validateConfig(process.env);
  }

  protected validateConfig(
    env: Record<string, string | undefined>
  ): AppConfigInput {
    const config = plainToClass(AppConfigInput, env);

    return this.transformAndValidate(config);
  }

  private transformAndValidate(config: AppConfigInput): AppConfigInput {
    const errors = validateSync(config, { whitelist: true });

    if (errors.length > 0) {
      const message = `Configuration validation error: ${JSON.stringify(
        errors[0].constraints[Object.keys(errors[0].constraints)[0]]
      )}`;

      this.loggerService.error(message);

      throw new InternalServerErrorException(message);
    }

    return config;
  }

  get isPrismaLogEnabled(): boolean {
    return this.variable.IS_PRISMA_LOG_ENABLED;
  }

  get isGraphqlQueryLogEnabled(): boolean {
    return this.variable.IS_GRAPHQL_QUERY_LOG_ENABLED;
  }
}
