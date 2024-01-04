import { ApiProperty } from "@nestjs/swagger";
import { ImplementsExactly } from "@api-core/modules/common/utils/exactly.utils";
import { Owner } from "@api-core/generated/prisma-client";
import { OwnerWithIncludes } from "@api-core/modules/owner/repositories/owner.include";
import { MiniCatResponse } from "@api-core/modules/cats/entities/cat.response";

export class MiniOwnerEntity
  implements ImplementsExactly<Owner, MiniOwnerEntity>
{
  /**
   * The name of the Owner
   * @example Bob Lewis
   */
  name: string;

  @ApiProperty({ example: 1, description: "The age of the Owner" })
  age: number;

  @ApiProperty({
    example: "12345678-1234-5678-1234-1234567890ab",
    description: "The uuid id of the owner",
  })
  id: string;
}

export class FullOwnerEntity
  extends MiniOwnerEntity
  implements ImplementsExactly<OwnerWithIncludes, FullOwnerEntity>
{
  @ApiProperty({
    example: "12345678-1234-5678-1234-1234567890ab",
    description: "The cats belonging to the owner",
  })
  cats: MiniCatResponse[];
}
