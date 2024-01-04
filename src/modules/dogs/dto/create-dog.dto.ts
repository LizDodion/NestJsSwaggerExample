import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";

export class CreateDogDto {
  @IsString()
  @ApiProperty({
    example: faker.person.firstName(),
    description: "The name of the dog",
  })
  readonly name: string;

  @IsInt()
  @ApiProperty({
    example: faker.number.int(),
    description: "The age of the dog",
  })
  readonly age: number;

  @IsString()
  @ApiProperty({
    example: faker.animal.dog(),
    description: "The breed of the dog",
  })
  readonly breed: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: faker.string.uuid(),
    nullable: true,
    description: "The ownerId of the dog",
  })
  readonly ownerId?: string;
}
