import { IsOptional, Matches } from "class-validator";

export class HealthcheckInput {
  message: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9 ]{4,20}$/)
  optionalMessage?: string; // 20 characters
}

export class HealthcheckPingDatabaseInput {
  adminToken: string;
}

export class HealthCheckSlackInput {
  text: string;

  channel: string;
}

export class HealthcheckMessageResponse {
  message: string;

  optionalMessage?: string;
}
