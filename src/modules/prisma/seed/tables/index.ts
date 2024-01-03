/* eslint no-restricted-syntax: 0 */
import { prismaService } from '@api-core/testing/common/setup-resources';
import { seedHealthcheckTable } from './healthcheck';

export const seedDatabase = async (): Promise<void> => {
  console.log('🌱 Seeding database...');

  try {
    // generated data from commands
    await seedHealthcheckTable(prismaService);

    await prismaService.$disconnect();
  } catch (e) {
    console.error('🔴 Error while seeding the database...');
    console.error(e);
    throw e;
  }
};
