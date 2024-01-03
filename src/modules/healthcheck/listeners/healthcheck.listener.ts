import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { OnPyneaEvent } from '../../common/decorators/onPyneaEvent.decorator';
import { HealthCheckPingEvent } from '../interfaces/healthCheckPingEvent.interface';
import { HealthCheckEvents } from './healthcheck.event';

@Injectable()
export class HealthcheckListener {
  constructor(private readonly logger: LoggerService) {}

  @OnPyneaEvent(HealthCheckEvents.Ping)
  ping(data: HealthCheckPingEvent): void {
    this.logger.log('It worked', { eventData: data });
  }
}
