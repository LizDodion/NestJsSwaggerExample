import { PrismaService } from "@api-core/modules/prisma/prisma.service";
import { LoggerService } from "@api-core/modules/logger/logger.service";
import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "@api-core/modules/cats/dto/create-cat.dto";
import { catInclude } from "@api-core/modules/cats/repositories/cat.include";
import { CatResponse } from "@api-core/modules/cats/entities/cat.response";

@Injectable()
export class CatsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService
  ) {}
  async createCat(catInput: CreateCatDto): Promise<CatResponse> {
    const cat = await this.prismaService.cat.create({
      data: catInput,
      include: catInclude,
    });
    this.loggerService.log(`Created cat with id: ${cat.id}`);
    return cat;
  }

  async findMany(): Promise<CatResponse[]> {
    const cats = await this.prismaService.cat.findMany({
      include: catInclude,
    });
    return cats;
  }

  async findOne(id: string): Promise<CatResponse> {
    const cat = await this.prismaService.cat.findUnique({
      where: { id },
      include: catInclude,
    });
    return cat;
  }
}
