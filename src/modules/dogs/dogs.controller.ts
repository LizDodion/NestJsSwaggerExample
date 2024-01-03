import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DogsService } from "./dogs.service";
import { CreateDogDto } from "./dto/create-dog.dto";
import { DogEntity } from "./entities/dog.entity";

@ApiBearerAuth()
@ApiTags("dogs")
@Controller("dogs")
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @ApiOperation({ summary: "Create dog" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(@Body() createDogDto: CreateDogDto): Promise<DogEntity> {
    return this.dogsService.create(createDogDto);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: DogEntity,
  })
  findOne(@Param("id") id: string): DogEntity {
    return this.dogsService.findOne(+id);
  }

  @Get()
  @ApiOperation({ summary: "Get dogs" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async findMany(): Promise<DogEntity[]> {
    return this.dogsService.findMany();
  }
}
