import { Module } from "@nestjs/common";
import { DogsController } from "./dogs.controller";
import { DogsService } from "./dogs.service";
import { DogsRepository } from "@api-core/modules/dogs/repositories/dogs.repository";
import { PrismaModule } from "@api-core/modules/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [DogsController],
  providers: [DogsService, DogsRepository],
})
export class DogsModule {}
