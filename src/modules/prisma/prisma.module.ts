import { Module } from '@nestjs/common';
import { LoggerModule } from '@api-core/modules/logger/logger.module';
import { ConfigModule } from '@api-core/modules/config/config.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
