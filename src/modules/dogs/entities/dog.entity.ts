import { ApiProperty } from "@nestjs/swagger";
import { ImplementsExactly } from "@api-core/modules/common/utils/exactly.utils";

import { Dog } from "@api-core/generated/prisma-client";

export class DogEntity implements ImplementsExactly<Dog, DogEntity> {
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
}
