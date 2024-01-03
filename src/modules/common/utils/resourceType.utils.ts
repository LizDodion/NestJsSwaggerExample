import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { catInclude } from "@api-core/modules/cats/repositories/cat.include";
import { dogInclude } from "@api-core/modules/dogs/repositories/dog.include";
import { ownerInclude } from "@api-core/modules/owner/repositories/owner.include";

export const PrismaResource = {
  CAT: { type: "cat", include: catInclude },
  DOG: { type: "dog", include: dogInclude },
  OWNER: { type: "owner", include: ownerInclude },
  //... add more resources here when needed
};

// get keys as type from PrismaResource
export type PrismaResourceType = keyof typeof PrismaResource;

export type ResourceType = {
  type: PrismaResourceType;
  arg: string;
};

export const ResourceType = (
  resources: ResourceType[]
): CustomDecorator<string> => SetMetadata("resources", resources);
