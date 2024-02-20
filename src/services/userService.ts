import { faker } from '@faker-js/faker';

export interface User {
  userId: string;
  username: string;
  email: string;
  sex: string;
}

const createRandomUser = (): User => {
  return {
    userId: faker.string.uuid().slice(0, 8),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    sex: faker.person.sex()
  };
};

const DEFAULT_USER_COUNT = 1000;
export const loadUsers = (count: number = DEFAULT_USER_COUNT) => {
  return faker.helpers.multiple(createRandomUser, {
    count
  });
};
