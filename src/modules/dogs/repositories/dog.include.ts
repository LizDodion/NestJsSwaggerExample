import { Prisma } from "@api-core/generated/prisma-client";

export const dogInclude = {
  owner: true,
};

export type DogWithIncludes = Prisma.DogGetPayload<{
  include: typeof dogInclude;
}>;
