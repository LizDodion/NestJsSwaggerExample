import { Injectable } from "@nestjs/common";
import { CreateDogDto } from "./dto/create-dog.dto";
import { DogEntity } from "./entities/dog.entity";

@Injectable()
export class DogsService {
  private readonly dogs: DogEntity[] = [];

  create(dog: CreateDogDto): DogEntity {
    this.dogs.push(dog);
    return dog;
  }

  findOne(id: number): DogEntity {
    return this.dogs[id];
  }
  findMany(): DogEntity[] {
    return this.dogs;
  }
}
