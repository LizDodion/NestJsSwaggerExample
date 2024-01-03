import type { PrismaService } from '../prisma.service';
import { findAllPaginated } from './findAllPaginated.extension';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createPrismaExtended(prisma: PrismaService) {
  return prisma.$extends({
    name: 'findAllPaginated',
    model: {
      $allModels: {
        findAllPaginated,
      },
    },
  });
}
