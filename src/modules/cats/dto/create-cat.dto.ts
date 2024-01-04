import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";

export class CreateCatDto {
  @IsString()
  @ApiProperty({
    example: faker.person.firstName(),
    description: "The name of the cat",
  })
  readonly name: string;

  @IsInt()
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 10 }),
    description: "The age of the cat",
  })
  readonly age: number;

  @IsString()
  @ApiProperty({
    example: faker.animal.cat(),
    description: "The breed of the cat",
  })
  readonly breed: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: faker.string.uuid(),
    nullable: true,
    description: "The ownerId of the cat",
  })
  readonly ownerId?: string;
}
