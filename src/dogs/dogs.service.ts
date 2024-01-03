import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: CreateDogDto): Dog {
    this.dogs.push(dog);
    return dog;
  }

  findOne(id: number): Dog {
    return this.dogs[id];
  }
  findMany(): Dog[] {
    return this.dogs;
  }
}
