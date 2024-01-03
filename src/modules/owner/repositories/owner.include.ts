import { Prisma } from "@api-core/generated/prisma-client";

export const ownerInclude = {
  dogs: true,
  cats: true,
};

export type OwnerWithIncludes = Prisma.OwnerGetPayload<{
  include: typeof ownerInclude;
}>;
