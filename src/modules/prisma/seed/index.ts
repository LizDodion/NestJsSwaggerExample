/* eslint no-restricted-syntax: 0 */
import { seedDatabase } from './tables';

seedDatabase()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
