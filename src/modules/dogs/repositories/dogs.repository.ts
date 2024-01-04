import { PrismaService } from "@api-core/modules/prisma/prisma.service";
import { LoggerService } from "@api-core/modules/logger/logger.service";
import { Injectable } from "@nestjs/common";
import { CreateDogDto } from "@api-core/modules/dogs/dto/create-dog.dto";
import { dogInclude } from "@api-core/modules/dogs/repositories/dog.include";
import { DogResponse } from "@api-core/modules/dogs/entities/dog.response";

@Injectable()
export class DogsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService
  ) {}
  async createDog(dogInput: CreateDogDto): Promise<DogResponse> {
    const dog = await this.prismaService.dog.create({
      data: dogInput,
      include: dogInclude,
    });
    this.loggerService.log(`Created dog with id: ${dog.id}`);
    return dog;
  }

  async findMany(): Promise<DogResponse[]> {
    const dogs = await this.prismaService.dog.findMany({
      include: dogInclude,
    });
    return dogs;
  }

  async findOne(id: string): Promise<DogResponse> {
    const dog = await this.prismaService.dog.findUnique({
      where: { id },
      include: dogInclude,
    });
    return dog;
  }
}
