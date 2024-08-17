import { faker } from "@faker-js/faker";

const getNameFake = () => {
  return faker.word.sample();
};

export default getNameFake;
