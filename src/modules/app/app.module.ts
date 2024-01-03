import { Module } from "@nestjs/common";
import { CatsModule } from "../cats/cats.module";
import { DogsModule } from "../dogs/dogs.module";
import { ConfigModule } from "@api-core/modules/config/config.module";
import { CommonModule } from "@api-core/modules/common/common.module";
import { LoggerModule } from "@api-core/modules/logger/logger.module";
import { PrismaModule } from "@api-core/modules/prisma/prisma.module";

@Module({
  imports: [
    CatsModule,
    DogsModule,
    ConfigModule,
    CommonModule,
    LoggerModule,
    PrismaModule,
  ],
})
export class AppModule {}
