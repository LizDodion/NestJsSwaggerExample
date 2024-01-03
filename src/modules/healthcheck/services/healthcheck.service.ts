import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@api-core/modules/prisma/prisma.service';
import { ConfigService } from '@api-core/modules/config/config.service';
import { LoggerService } from '@api-core/modules/logger/logger.service';
import { SanitiseResponse } from '@api-core/modules/common/decorators/sanitiseResponse.decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from '../dto/healthcheck.model';
import { HealthCheckEvents } from '../listeners/healthcheck.event';

@Injectable()
export class HealthcheckService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private eventEmitter: EventEmitter2,
    private logger: LoggerService,
  ) {}

  @SanitiseResponse(Message)
  get(): Message {
    this.logger.log('ping received');
    this.eventEmitter.emit(HealthCheckEvents.Ping, { message: 'Ping' });
    return { message: 'Pong', dateTime: new Date() };
  }

  @SanitiseResponse(Message)
  async healthcheckPingDatabase(): Promise<Message> {
    const result = await this.prisma.healthcheck.findFirst();
    if (!result) {
      throw new BadRequestException('Database is not available');
    }
    return { message: result.message, dateTime: result.updatedAt };
  }
}
