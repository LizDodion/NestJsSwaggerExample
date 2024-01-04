import { Injectable } from "@nestjs/common";
import { CreateDogDto } from "./dto/create-dog.dto";
import { DogsRepository } from "./repositories/dogs.repository";
import { DogResponse } from "@api-core/modules/dogs/entities/dog.response";
@Injectable()
export class DogsService {
  constructor(private readonly dogRepository: DogsRepository) {}

  create(dog: CreateDogDto): Promise<DogResponse> {
    return this.dogRepository.createDog(dog);
  }

  findOne(id: string): Promise<DogResponse> {
    return this.dogRepository.findOne(id);
  }

  findMany(): Promise<DogResponse[]> {
    return this.dogRepository.findMany();
  }
}
