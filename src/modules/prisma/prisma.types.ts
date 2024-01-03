import { Prisma } from '@api-core/generated/prisma-client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    // export type MediaJson = MediaResponse;
  }
}

export type BatchPayload = {
  count: number;
};

export type PrismaTransactionClient = Prisma.TransactionClient;
