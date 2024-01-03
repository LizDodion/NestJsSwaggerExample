import { Module } from "@nestjs/common";
import { PrismaModule } from "@api-core/modules/prisma/prisma.module";
import { ResolverLoggingInterceptor } from "@api-core/modules/common/interceptors/resolverLogging.interceptor";
import { ConfigService } from "@api-core/modules/config/config.service";
import { HealthcheckController } from "./controllers/healthcheck.controller";

import { HealthcheckService } from "./services/healthcheck.service";
import { HealthcheckListener } from "./listeners/healthcheck.listener";
import { ElinksAdminModule } from "@api-core/modules/elinksAdmin/pyneaAdmin.module";

@Module({
  imports: [PrismaModule, ElinksAdminModule],
  controllers: [HealthcheckController],
  providers: [
    HealthcheckService,
    ConfigService,
    ResolverLoggingInterceptor,
    HealthcheckListener,
  ],
})
export class HealthcheckModule {}
