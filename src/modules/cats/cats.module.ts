import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { CatsRepository } from "@api-core/modules/cats/repositories/cats.repository";
import { PrismaModule } from "@api-core/modules/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
})
export class CatsModule {}
