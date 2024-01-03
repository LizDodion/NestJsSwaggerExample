import { ApiProperty } from "@nestjs/swagger";
import { ImplementsExactly } from "@api-core/modules/common/utils/exactly.utils";
import { Cat } from "@api-core/generated/prisma-client";

export class CatEntity implements ImplementsExactly<Cat, CatEntity> {
  /**
   * The name of the Cat
   * @example Kitty
   */
  name: string;

  @ApiProperty({ example: 1, description: "The age of the Cat" })
  age: number;

  @ApiProperty({
    example: "Maine Coon",
    description: "The breed of the Cat",
  })
  breed: string;
}
