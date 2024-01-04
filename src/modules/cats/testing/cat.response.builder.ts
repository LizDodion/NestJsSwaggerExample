import { MiniCatResponse } from "@api-core/modules/cats/entities/cat.response";
import { faker } from "@faker-js/faker";

export const miniCatResponseBuilder = (
  topicResponse?: Partial<MiniCatResponse>
): MiniCatResponse => ({
  id: faker.string.uuid(),
  ownerId: faker.string.uuid(),
  name: faker.person.firstName(),
  breed: faker.animal.cat(),
  age: faker.number.int({ min: 1, max: 10 }),
  ...topicResponse,
});
