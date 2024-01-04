import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { HealthCheckPingEvent } from "../interfaces/healthCheckPingEvent.interface";
import { HealthCheckEvents } from "./healthcheck.event";
import { OnElinksEvent } from "@api-core/modules/common/decorators/onElinksEvent.decorator";

@Injectable()
export class HealthcheckListener {
  constructor(private readonly logger: LoggerService) {}

  @OnElinksEvent(HealthCheckEvents.Ping)
  ping(data: HealthCheckPingEvent): void {
    this.logger.log("It worked", { eventData: data });
  }
}
