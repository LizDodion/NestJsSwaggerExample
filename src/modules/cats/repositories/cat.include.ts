import { Prisma } from "@api-core/generated/prisma-client";

export const catInclude = {
  owner: true,
};

export type CatWithIncludes = Prisma.CatGetPayload<{
  include: typeof catInclude;
}>;
