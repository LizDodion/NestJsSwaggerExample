import { IsInt, IsString } from 'class-validator';

export class CreateDogDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
