import { MiniDogResponse } from "@api-core/modules/dogs/entities/dog.response";
import { faker } from "@faker-js/faker";

export const miniDogResponseBuilder = (
  topicResponse?: Partial<MiniDogResponse>
): MiniDogResponse => ({
  id: faker.string.uuid(),
  ownerId: faker.string.uuid(),
  name: faker.person.firstName(),
  breed: faker.animal.dog(),
  age: faker.number.int({ min: 1, max: 10 }),
  ...topicResponse,
});
