import { ApiProperty } from "@nestjs/swagger";
import { ImplementsExactly } from "@api-core/modules/common/utils/exactly.utils";

import { Dog } from "@api-core/generated/prisma-client";
import { MiniOwnerEntity } from "@api-core/modules/owner/entities/owner.entity";
import { DogWithIncludes } from "@api-core/modules/dogs/repositories/dog.include";
import { miniDogResponseBuilder } from "@api-core/modules/dogs/testing/dog.response.builder";

export class MiniDogResponse
  implements ImplementsExactly<Dog, MiniDogResponse>
{
  /**
   * The name of the Dog
   * @example Doggy
   */
  name: string;

  @ApiProperty({ example: 1, description: "The age of the Dog" })
  age: number;

  @ApiProperty({
    example: "Labradoodle",
    description: "The breed of the Dog",
  })
  breed: string;

  @ApiProperty({
    example: "uuid",
    description: "The uuid id of the owner",
  })
  ownerId: string;

  @ApiProperty({
    example: "uuid",
    description: "The uuid id of the dog",
  })
  id: string;
}

export class DogResponse
  extends MiniDogResponse
  implements ImplementsExactly<DogWithIncludes, DogResponse>
{
  @ApiProperty({
    example: miniDogResponseBuilder(),
    description: "The owner of the dog",
  })
  owner: MiniOwnerEntity;
}
