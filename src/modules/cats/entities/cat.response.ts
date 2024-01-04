import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ImplementsExactly } from "@api-core/modules/common/utils/exactly.utils";
import { Cat } from "@api-core/generated/prisma-client";
import { CatWithIncludes } from "@api-core/modules/cats/repositories/cat.include";
import { MiniOwnerEntity } from "@api-core/modules/owner/entities/owner.entity";
import { miniCatResponseBuilder } from "@api-core/modules/cats/testing/cat.response.builder";
import { faker } from "@faker-js/faker";

export class MiniCatResponse
  implements ImplementsExactly<Cat, MiniCatResponse>
{
  @ApiProperty({
    example: faker.person.firstName(),
    description: "The name of the Cat",
  })
  name: string;

  /**
   * The age of the Cat
   * @example 2
   */
  age: number;

  @ApiProperty({
    example: faker.animal.cat(),
    description: "The breed of the Cat",
  })
  breed: string;

  @ApiPropertyOptional({
    example: faker.string.uuid(),
    description: "The uuid id of the owner",
  })
  ownerId: string;

  @ApiProperty({
    example: faker.string.uuid(),
    description: "The uuid id of the cat",
  })
  id: string;
}

export class CatResponse
  extends MiniCatResponse
  implements ImplementsExactly<CatWithIncludes, CatResponse>
{
  @ApiPropertyOptional({
    example: miniCatResponseBuilder(),
    description: "The owner of the cat",
  })
  owner: MiniOwnerEntity;
}
