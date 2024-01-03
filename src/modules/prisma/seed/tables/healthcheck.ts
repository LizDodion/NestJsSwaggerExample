/* eslint no-restricted-syntax: 0 */
import { PrismaClient } from '../../prisma.service';

export const seedHealthcheckTable = async (
  prismaClient: PrismaClient,
): Promise<void> => {
  console.log('🪴  Seeding table Healthcheck...');

  const pingTableMessage = await prismaClient.healthcheck.upsert({
    where: { id: '1' },
    update: {
      id: '1',
      updatedAt: new Date(),
    },
    create: {
      id: '1',
      message: 'Pong from database',
    },
  });

  console.log('🍏 Seeding completed for table Healthcheck', {
    pingTableMessage,
  });
};
