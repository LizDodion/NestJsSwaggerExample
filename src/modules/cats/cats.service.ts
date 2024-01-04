import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsRepository } from "./repositories/cats.repository";
import { CatResponse } from "@api-core/modules/cats/entities/cat.response";
@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatsRepository) {}

  create(cat: CreateCatDto): Promise<CatResponse> {
    return this.catRepository.createCat(cat);
  }

  findOne(id: string): Promise<CatResponse> {
    return this.catRepository.findOne(id);
  }

  findMany(): Promise<CatResponse[]> {
    return this.catRepository.findMany();
  }
}
