import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatResponse } from "@api-core/modules/cats/entities/cat.response";

@ApiBearerAuth()
@ApiTags("cats")
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: "Create cat" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(@Body() createCatDto: CreateCatDto): Promise<CatResponse> {
    return this.catsService.create(createCatDto);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: CatResponse,
  })
  findOne(@Param("id") id: string): Promise<CatResponse> {
    return this.catsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: "Get cats" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async findMany(): Promise<CatResponse[]> {
    return this.catsService.findMany();
  }
}
