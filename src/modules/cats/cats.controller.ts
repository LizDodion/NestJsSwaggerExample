import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatEntity } from "./entities/cat.entity";

@ApiBearerAuth()
@ApiTags("cats")
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: "Create cat" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catsService.create(createCatDto);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: CatEntity,
  })
  findOne(@Param("id") id: string): CatEntity {
    return this.catsService.findOne(+id);
  }

  @Get()
  @ApiOperation({ summary: "Get cats" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async findMany(): Promise<CatEntity[]> {
    return this.catsService.findMany();
  }
}
